import {ApiProperty} from "@nestjs/swagger";

export class RegisterDto {
	@ApiProperty()
	username: string;

	@ApiProperty()
	password: string;

	@ApiProperty({required: false})
	email: string;

	@ApiProperty({required: false})
	first_name: string;

	@ApiProperty({required: false})
	last_name: string;
}

export class RegisterResponseDto {
	@ApiProperty()
	accessToken: string;

	@ApiProperty()
	refreshToken: string;

	@ApiProperty({type: () => User})
	user: {
		id: number;
		username: string;
		email: string;
		first_name: string;
		last_name: string;
	}
}

class User {
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