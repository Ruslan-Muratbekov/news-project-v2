import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthEntity} from "./entity/auth.entity";
import {EmailEntity} from "./entity/email.entity";
import {PasswordEntity} from "./entity/password.entity";
import {ProfileEntity} from "./entity/profile.entity";
import {AccessStrategy} from "../strategies/access.strategy";
import {RefreshStrategy} from "../strategies/refresh.strategy";
import {PasswordStrategy} from "../strategies/password.strategy";
import {EmailStrategy} from "../strategies/email.strategy";

@Module({
	controllers: [AuthController],
	providers: [AuthService, AccessStrategy, RefreshStrategy, PasswordStrategy, EmailStrategy],
	imports: [
		JwtModule.register({}),
		TypeOrmModule.forFeature([AuthEntity, EmailEntity, PasswordEntity, ProfileEntity])
	]
})
export class AuthModule {
}
