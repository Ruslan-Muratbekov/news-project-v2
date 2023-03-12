import {ApiProperty} from "@nestjs/swagger";

export class ProfileDto {
	@ApiProperty()
	username: string;

	@ApiProperty()
	first_name: string;

	@ApiProperty()
	last_name: string;

	constructor(model) {
		this.first_name = model.first_name
		this.username = model.username
		this.last_name = model.last_name
	}
}

export class ProfileUserDto {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
}

export class CreateProfileDto {
	@ApiProperty()
	username: string;

	@ApiProperty()
	first_name: string;

	@ApiProperty()
	last_name: string;
}

export class UpdateProfileDto {
	@ApiProperty()
	username: string;

	@ApiProperty()
	first_name: string;

	@ApiProperty()
	last_name: string;
}