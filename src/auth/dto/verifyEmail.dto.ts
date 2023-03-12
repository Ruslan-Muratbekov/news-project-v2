export class VerifyEmailDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	jwt: string;
}

export class VerifyEmailResponseDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
}