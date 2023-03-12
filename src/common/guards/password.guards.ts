import {AuthGuard} from "@nestjs/passport";

export class PasswordGuards extends AuthGuard('jwt_password'){}