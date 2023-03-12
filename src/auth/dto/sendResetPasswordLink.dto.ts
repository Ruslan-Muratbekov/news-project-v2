import {ApiProperty} from "@nestjs/swagger";

export class SendResetPasswordLinkDto {
	@ApiProperty()
	login: string
}