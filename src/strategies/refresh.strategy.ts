import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt_refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
			secretOrKey: process.env.SECRET_REFRESH_KEY,
			ignoreExpiration: false,
			passReqToCallback: true
		});
	}

	private validate(req, payload) {
		return {
			...payload,
			refreshToken: req.body.refreshToken
		}
	}
}