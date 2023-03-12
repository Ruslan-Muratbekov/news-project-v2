import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {PasswordEntity} from "../auth/entity/password.entity";
import {Repository} from "typeorm";

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, 'jwt_password') {
	constructor(
		@InjectRepository(PasswordEntity) private readonly passwordRepository: Repository<PasswordEntity>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwt_password'),
			secretOrKey: process.env.SECRET_PASSWORD_KEY,
			ignoreExpiration: false,
			passReqToCallback: true
		});
	}

	validate(req, payload) {
		return {
			...payload,
			jwt: req.query.jwt_password
		}
	}
}