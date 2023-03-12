import {Body, Controller, Get, Post, Put, Req, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto, RegisterResponseDto} from "./dto/register.dto";
import {LoginDto, LoginResponseDto} from "./dto/login.dto";
import {SendResetPasswordLinkDto} from "./dto/sendResetPasswordLink.dto";
import {ChangePasswordDto} from "./dto/changePassword.dto";
import {PasswordGuards} from "../common/guards/password.guards";
import {RegisterEmailDto} from "./dto/registerEmail.dto";
import {AccessGuards} from "../common/guards/access.guards";
import {EmailGuards} from "../common/guards/email.guards";
import {RefreshGuards} from "../common/guards/refresh.guards";
import {VerifyEmailResponseDto} from "./dto/verifyEmail.dto";
import {UpdateTokenResponseDto} from "./dto/updateToken.dto";
import {CreateProfileDto, UpdateProfileDto} from "./dto/profile.dto";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Get()
	getHello() {
		return this.authService.getHello()
	}

	@Post('register')
	async register(@Body() data: RegisterDto): Promise<RegisterResponseDto> {
		return this.authService.register(data)
	}

	@Post('login')
	async login(@Body() data: LoginDto): Promise<LoginResponseDto> {
		return this.authService.login(data)
	}

	@Post('send-reset-password-link')
	async sendResetPasswordLink(@Body() data: SendResetPasswordLinkDto): Promise<SendResetPasswordLinkDto> {
		return this.authService.sendResetPassword(data)
	}

	@UseGuards(PasswordGuards)
	@Post('change-password')
	changePassword(@Body() data: ChangePasswordDto, @Req() req): Promise<ChangePasswordDto> {
		return this.authService.changePassword(data, req.user)
	}

	@UseGuards(AccessGuards)
	@Post('register-email')
	registerEmail(@Body() data: RegisterEmailDto, @Req() req): Promise<RegisterEmailDto> {
		return this.authService.registerEmail(data, req.user)
	}

	@UseGuards(EmailGuards)
	@Get('verify-email')
	async verifyEmail(@Req() req): Promise<VerifyEmailResponseDto> {
		return this.authService.verifyEmail(req.user)
	}

	@UseGuards(RefreshGuards)
	@Post('logout')
	async logout(@Req() req): Promise<void> {
		return this.authService.logout(req.user)
	}

	@UseGuards(RefreshGuards)
	@Post('updateToken')
	async updateToken(@Req() req): Promise<UpdateTokenResponseDto> {
		return this.authService.updateToken(req.user)
	}

	@UseGuards(AccessGuards)
	@Get('profile')
	async responseProfile(@Req() req) {
		return this.authService.responseProfile(req.user)
	}

	@UseGuards(AccessGuards)
	@Post('profile')
	async createProfile(@Req() req, @Body() data: CreateProfileDto): Promise<CreateProfileDto> {
		return this.authService.createProfile(req.user, data)
	}

	@UseGuards(AccessGuards)
	@Put('profile')
	async updateProfile(@Req() req, @Body() data: UpdateProfileDto): Promise<UpdateProfileDto> {
		return this.authService.updateProfile(req.user, data)
	}
}
