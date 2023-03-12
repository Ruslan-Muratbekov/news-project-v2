import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
	@ApiProperty()
	username: string;

	@ApiProperty()
	password: string
}

export class LoginResponseDto {
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
		last_name: string
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
	last_name: string
}