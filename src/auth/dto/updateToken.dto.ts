import {ApiProperty} from "@nestjs/swagger";

export class UpdateTokenDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	refreshToken: string;
}

export class UpdateTokenResponseDto {
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