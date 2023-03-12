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
import {CreateProfileDto, ProfileDto, UpdateProfileDto} from "./dto/profile.dto";
import {ApiBearerAuth, ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('register')
	@ApiBody({type: RegisterDto})
	@ApiResponse({status: 200, type: RegisterResponseDto})
	async register(@Body() data: RegisterDto): Promise<RegisterResponseDto> {
		return this.authService.register(data)
	}

	@Post('login')
	@ApiBody({type: LoginDto})
	@ApiResponse({status: 200, type: LoginResponseDto})
	async login(@Body() data: LoginDto): Promise<LoginResponseDto> {
		return this.authService.login(data)
	}

	@Post('send-reset-password-link')
	@ApiBody({type: SendResetPasswordLinkDto})
	@ApiResponse({status: 200, type: SendResetPasswordLinkDto})
	async sendResetPasswordLink(@Body() data: SendResetPasswordLinkDto): Promise<SendResetPasswordLinkDto> {
		return this.authService.sendResetPassword(data)
	}

	@Post('change-password')
	@ApiBearerAuth('jwt_password')
	@UseGuards(PasswordGuards)
	@ApiBody({type: ChangePasswordDto})
	@ApiResponse({status: 200, type: ChangePasswordDto})
	changePassword(@Body() data: ChangePasswordDto, @Req() req): Promise<ChangePasswordDto> {
		return this.authService.changePassword(data, req.user)
	}

	@Post('register-email')
	@ApiBearerAuth('jwt_access')
	@UseGuards(AccessGuards)
	@ApiBody({type: RegisterEmailDto})
	@ApiResponse({status: 200, type: RegisterEmailDto})
	registerEmail(@Body() data: RegisterEmailDto, @Req() req): Promise<RegisterEmailDto> {
		return this.authService.registerEmail(data, req.user)
	}

	@Post('verify-email')
	@ApiBearerAuth('jwt_email')
	@UseGuards(EmailGuards)
	@ApiResponse({status: 200, type: VerifyEmailResponseDto})
	async verifyEmail(@Req() req): Promise<VerifyEmailResponseDto> {
		return this.authService.verifyEmail(req.user)
	}

	@Post('logout')
	@ApiBearerAuth('jwt_refresh')
	@UseGuards(RefreshGuards)
	async logout(@Req() req): Promise<void> {
		return this.authService.logout(req.user)
	}

	@Post('updateToken')
	@ApiBearerAuth('jwt_refresh')
	@UseGuards(RefreshGuards)
	@ApiResponse({status: 200, type: UpdateTokenResponseDto})
	async updateToken(@Req() req): Promise<UpdateTokenResponseDto> {
		return this.authService.updateToken(req.user)
	}

	@Get('profile')
	@ApiBearerAuth('jwt_access')
	@UseGuards(AccessGuards)
	@ApiResponse({status: 200, type: ProfileDto})
	async responseProfile(@Req() req): Promise<ProfileDto> {
		return this.authService.responseProfile(req.user)
	}

	@Post('profile')
	@ApiBearerAuth('jwt_access')
	@UseGuards(AccessGuards)
	@ApiResponse({status: 200, type: CreateProfileDto})
	@ApiBody({type: CreateProfileDto})
	async createProfile(@Req() req, @Body() data: CreateProfileDto): Promise<CreateProfileDto> {
		return this.authService.createProfile(req.user, data)
	}

	@Put('profile')
	@ApiBearerAuth('jwt_access')
	@UseGuards(AccessGuards)
	@ApiBody({type: UpdateProfileDto})
	@ApiResponse({status: 200, type: UpdateProfileDto})
	async updateProfile(@Req() req, @Body() data: UpdateProfileDto): Promise<UpdateProfileDto> {
		console.log(req)
		return this.authService.updateProfile(req.user, data)
	}
}