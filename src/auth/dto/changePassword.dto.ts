import {ApiProperty} from "@nestjs/swagger";

export class ChangePasswordDto {
	@ApiProperty()
	old_password: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	password_confirm: string;
}

export class ChangePasswordRequestUserDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	jwt: string;
}