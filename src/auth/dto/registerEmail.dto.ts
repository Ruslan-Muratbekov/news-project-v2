import {ApiProperty} from "@nestjs/swagger";

export class RegisterEmailDto {
	@ApiProperty()
	email: string
}

export class RegisterEmailRequestUserDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	jwt: string;
}