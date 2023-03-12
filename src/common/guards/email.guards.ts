import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class EmailGuards extends AuthGuard('jwt_email'){}