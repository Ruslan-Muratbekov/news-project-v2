import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class RefreshGuards extends AuthGuard('jwt_refresh'){}