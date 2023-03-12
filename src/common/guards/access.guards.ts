import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class AccessGuards extends AuthGuard('jwt_access'){}