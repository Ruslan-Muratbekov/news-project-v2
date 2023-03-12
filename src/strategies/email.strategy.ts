import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy, 'jwt_email') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwt_email'),
			secretOrKey: process.env.SECRET_MAIL_KEY,
			ignoreExpiration: false,
			passReqToCallback: true
		});
	}

	validate(req, payload) {
		return {
			...payload,
			jwt: req.query.jwt_email
		}
	}
}