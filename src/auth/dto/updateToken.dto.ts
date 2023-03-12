export class UpdateTokenDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	refreshToken: string;
}

export class UpdateTokenResponseDto {
	accessToken: string;
	refreshToken: string;
	user: {
		id: number;
		username: string;
		email: string;
		first_name: string;
		last_name: string
	}
}
