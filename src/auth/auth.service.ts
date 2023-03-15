import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AuthEntity} from "./entity/auth.entity";
import {ProfileEntity} from "./entity/profile.entity";
import {PasswordEntity} from "./entity/password.entity";
import {EmailEntity} from "./entity/email.entity";
import {UserDto} from "./dto/user.dto";
import {JwtService} from "@nestjs/jwt";
import {RegisterDto, RegisterResponseDto} from "./dto/register.dto";

import * as bcrypt from 'bcryptjs'
import * as nodemailer from 'nodemailer'

import {LoginDto, LoginResponseDto} from "./dto/login.dto";
import {SendResetPasswordLinkDto} from "./dto/sendResetPasswordLink.dto";
import {ChangePasswordDto, ChangePasswordRequestUserDto} from "./dto/changePassword.dto";
import {RegisterEmailDto, RegisterEmailRequestUserDto} from "./dto/registerEmail.dto";
import {VerifyEmailDto, VerifyEmailResponseDto} from "./dto/verifyEmail.dto";
import {LogoutDto} from "./dto/logout.dto";
import {UpdateTokenDto, UpdateTokenResponseDto} from "./dto/updateToken.dto";
import {CreateProfileDto, ProfileDto, ProfileUserDto, UpdateProfileDto} from "./dto/profile.dto";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
		@InjectRepository(ProfileEntity) private readonly profileRepository: Repository<ProfileEntity>,
		@InjectRepository(PasswordEntity) private readonly passwordRepository: Repository<PasswordEntity>,
		@InjectRepository(EmailEntity) private readonly emailRepository: Repository<EmailEntity>,
		private readonly jwtService: JwtService
	) {
	}

	async register({username, password, last_name, first_name, email}: RegisterDto): Promise<RegisterResponseDto> {
		const candidate = await this.authRepository.findOne({where: {username}})
		if (candidate) {
			throw new HttpException('Такой пользователь уже есть!', HttpStatus.BAD_REQUEST)
		}

		const profileEntity = await this.profileRepository.create({})
		const passwordEntity = await this.passwordRepository.create({})
		const emailEntity = await this.emailRepository.create({})

		await this.profileRepository.manager.save(profileEntity)
		await this.passwordRepository.manager.save(passwordEntity)
		await this.emailRepository.manager.save(emailEntity)

		const hashPassword = await bcrypt.hash(password, 8)

		const user = await this.authRepository.create({
			username,
			password: hashPassword,
			email,
			first_name,
			last_name,
			profileEntity,
			passwordEntity,
			emailEntity,
		})

		const userDto = new UserDto(user)
		const tokens = this.generateTokens({...userDto})
		user.refreshToken = tokens.refreshToken
		await this.authRepository.manager.save(user)

		return {...tokens, user: userDto}
	}

	async login({username, password}: LoginDto): Promise<LoginResponseDto> {
		const candidate = await this.authRepository.findOne({where: {username}})
		if (!candidate) {
			throw new HttpException('Вы еще не зарегистрировались', HttpStatus.BAD_REQUEST)
		}
		const verifyPassword = await bcrypt.compare(password, candidate.password)
		if (!verifyPassword) {
			throw new HttpException('Логин или пароль не правильный', HttpStatus.BAD_REQUEST)
		}
		const userDto = new UserDto(candidate)
		const tokens = this.generateTokens({...userDto})
		candidate.refreshToken = tokens.refreshToken
		await this.authRepository.manager.save(candidate)
		return {...tokens, user: userDto}
	}

	async sendResetPassword({login}: SendResetPasswordLinkDto): Promise<SendResetPasswordLinkDto> {
		const candidate = await this.authRepository.findOne({where: {username: login}})
		if (!candidate) {
			throw new HttpException('Хмм! Такого пользователя нету в базе...', HttpStatus.BAD_REQUEST)
		}
		if (!candidate.email) {
			throw new HttpException('У вас еще нету почты', HttpStatus.BAD_REQUEST)
		}
		const userDto = new UserDto(candidate)
		const token = this.generateTokenPassword({...userDto})

		const tokenEntity = await this.passwordRepository.findOne({where: {authId: userDto.id}})
		tokenEntity.token = token
		await this.passwordRepository.manager.save(tokenEntity)

		await this.sendResetPasswordLink(
			candidate.email,
			`${process.env.CLIENT_URL}/changepasword/?jwt_password=${token}`
		)

		return {login}
	}

	async changePassword(data: ChangePasswordDto, user: ChangePasswordRequestUserDto): Promise<ChangePasswordDto> {
		const candidate = await this.authRepository.findOne({where: {id: user.id}})
		const passwordEntity = await this.passwordRepository.findOne({where: {token: user.jwt}})
		if (!candidate || passwordEntity === null) {
			throw new HttpException('Ошибка с ссылкой или она устарела', HttpStatus.BAD_REQUEST)
		}
		if (data.password !== data.password_confirm) {
			throw new HttpException('Пароли не совпадает', HttpStatus.BAD_REQUEST)
		}
		const verifyPassword = await bcrypt.compare(data.password, candidate.password)
		if (verifyPassword) {
			throw new HttpException('Не правильный пароль', HttpStatus.BAD_REQUEST)
		}
		candidate.password = await bcrypt.hash(data.password, 8)
		await this.authRepository.manager.save(candidate)

		passwordEntity.token = null
		await this.passwordRepository.manager.save(passwordEntity)

		return data
	}

	async registerEmail(data: RegisterEmailDto, user: RegisterEmailRequestUserDto): Promise<RegisterEmailDto> {
		const email = data.email
		const checkEmail = await this.authRepository.findOne({where: {email}})
		if (checkEmail) {
			throw new HttpException('Ошибка! Эта почта уже используется', HttpStatus.BAD_REQUEST)
		}
		const userDto = new UserDto(user)
		const token = this.generateTokenEmail({...userDto, email})
		const emailEntity = await this.emailRepository.findOne({where: {authId: userDto.id}})
		emailEntity.token = token
		await this.emailRepository.manager.save(emailEntity)
		await this.sendResetEmailLink(
			email,
			`${process.env.API_URL}/api/auth/verify-email/?jwt_email=${token}`
		)
		return data
	}

	async verifyEmail(user: VerifyEmailDto): Promise<VerifyEmailResponseDto> {
		const verifyToken = await this.emailRepository.findOne({where: {token: user.jwt}})
		if (!verifyToken) {
			throw new HttpException('Ошибка! Ссылка устарела или не правильная!', HttpStatus.UNAUTHORIZED)
		}
		const candidate = await this.authRepository.findOne({where: {id: user.id}})
		if (!candidate) {
			throw new HttpException('Ошибка! Такого пользователя нету', HttpStatus.UNAUTHORIZED)
		}
		candidate.email = user.email
		await this.authRepository.manager.save(candidate)
		verifyToken.token = null
		await this.emailRepository.manager.save(verifyToken)
		const userDto = new UserDto(candidate)
		return {...userDto}
	}

	async logout(user: LogoutDto): Promise<void> {
		const candidate = await this.authRepository.findOne({where: {refreshToken: user.refreshToken}})
		if (!candidate) {
			throw new HttpException('Ошибка с токеном', HttpStatus.BAD_REQUEST)
		}
		candidate.refreshToken = null
		await this.authRepository.manager.save(candidate)
	}

	async updateToken(user: UpdateTokenDto): Promise<UpdateTokenResponseDto> {
		const candidate = await this.authRepository.findOne({where: {refreshToken: user.refreshToken}})
		if (!candidate) {
			throw new HttpException('Вы уже вышли из системы или вы еще не в системе', HttpStatus.BAD_REQUEST)
		}
		const userDto = new UserDto(candidate)
		const tokens = this.generateTokens({...userDto})
		candidate.refreshToken = tokens.refreshToken
		await this.authRepository.manager.save(candidate)
		return {...tokens, user: userDto}
	}

	async responseProfile(user: ProfileUserDto): Promise<ProfileDto> {
		const candidate = await this.profileRepository.findOne({where: {authId: user.id}})
		if (!candidate.username && !candidate.first_name && !candidate.last_name) {
			throw new HttpException('Профиль еще не создан!', HttpStatus.BAD_REQUEST)
		}
		return new ProfileDto(candidate)
	}

	async createProfile(user: ProfileUserDto, data: CreateProfileDto): Promise<CreateProfileDto> {
		const candidate = await this.profileRepository.findOne({where: {authId: user.id}})
		if (candidate.username && candidate.first_name && candidate.last_name) {
			throw new HttpException('Профиль уже создан создан!', HttpStatus.BAD_REQUEST)
		}
		candidate.username = data.username
		candidate.first_name = data.first_name
		candidate.last_name = data.last_name
		await this.profileRepository.manager.save(candidate)
		return data
	}

	async updateProfile(user: ProfileUserDto, data: UpdateProfileDto): Promise<UpdateProfileDto> {
		if(!data.first_name || !data.last_name || !data.username){
			throw new HttpException('Заполните все поля', HttpStatus.BAD_REQUEST)
		}
		const candidate = await this.profileRepository.findOne({where: {authId: user.id}})
		if (!candidate.username && !candidate.first_name && !candidate.last_name) {
			throw new HttpException('Профиль еще не создан!', HttpStatus.BAD_REQUEST)
		}
		candidate.username = data.username
		candidate.first_name = data.first_name
		candidate.last_name = data.last_name
		await this.profileRepository.manager.save(candidate)
		return new ProfileDto(candidate)
	}

	transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: `${process.env.SMTP_USERS}`,
			pass: `${process.env.SMTP_PASSWORD}`
		}
	})

	private async sendResetEmailLink(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USERS,
			to,
			subject: `${process.env.API_URL}`,
			text: '',
			html: `
			<div style="background: black">
					<h1 style="text-align: center; color: white">
						Для смены почты перейдите по ссылке
					</h1>
					<a href="${link}">${link}</a>	
			</div>`
		})
	}

	private async sendResetPasswordLink(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USERS,
			to,
			subject: `${process.env.API_URL}`,
			text: '',
			html: `
			<div style="background: black">
					<h1 style="text-align: center; color: white">
						Для смены пароля перейдите по ссылке
					</h1>
					<a href="${link}">${link}</a>	
			</div>`
		})
	}

	private generateTokenPassword(payload) {
		return this.jwtService.sign(payload, {
			secret: process.env.SECRET_PASSWORD_KEY,
			expiresIn: '30m'
		})
	}

	private generateTokenEmail(payload) {
		return this.jwtService.sign(payload, {
			secret: process.env.SECRET_MAIL_KEY,
			expiresIn: '30m'
		})
	}

	private generateTokens(payload) {
		const accessToken = this.jwtService.sign(payload, {
			secret: process.env.SECRET_ACCESS_KEY,
			expiresIn: '30m'
		})
		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.SECRET_REFRESH_KEY,
			expiresIn: '7d'
		})
		return {
			accessToken,
			refreshToken
		}
	}
}
