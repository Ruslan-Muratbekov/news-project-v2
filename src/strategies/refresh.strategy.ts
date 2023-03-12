import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt_refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET_REFRESH_KEY,
			ignoreExpiration: false,
			passReqToCallback: true
		});
	}

	private validate(req, payload) {
		return {
			...payload,
			refreshToken: req.query.jwt_refresh
		}
	}
}