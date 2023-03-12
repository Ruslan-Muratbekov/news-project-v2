export class LoginDto {
	username: string;
	password: string
}

export class LoginResponseDto {
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