import {ApiProperty} from "@nestjs/swagger";

export class VerifyEmailDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	jwt: string;
}

export class VerifyEmailResponseDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	username: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	first_name: string;

	@ApiProperty()
	last_name: string;
}