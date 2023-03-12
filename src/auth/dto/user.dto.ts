export class UserDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string

	constructor(model) {
		this.id = model.id
		this.username = model.username
		this.email = model.email
		this.first_name = model.first_name
		this.last_name = model.last_name
	}

}