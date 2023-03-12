export class ChangePasswordDto {
	old_password: string;
	password: string;
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