import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt_access') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET_ACCESS_KEY,
			ignoreExpiration: false
		});
	}

	private validate(payload) {
		return payload
	}
}