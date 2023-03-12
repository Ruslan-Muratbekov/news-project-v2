export class RegisterDto {
	username: string;
	password: string;
	email: string;
	first_name: string;
	last_name: string;
}

export class RegisterResponseDto {
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