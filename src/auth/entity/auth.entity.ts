import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProfileEntity} from "./profile.entity";
import {EmailEntity} from "./email.entity";
import {PasswordEntity} from "./password.entity";
import {ApiProperty} from "@nestjs/swagger";
import {NewsEntity} from "../../news/entity/news.entity";

@Entity({name: 'auth'})
export class AuthEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty()
	@Column({unique: true, nullable: false})
	username: string

	@ApiProperty()
	@Column({nullable: true})
	email: string

	@ApiProperty()
	@Column({nullable: false})
	password: string

	@ApiProperty()
	@Column({nullable: true})
	first_name: string

	@ApiProperty()
	@Column({nullable: true})
	last_name: string

	@ApiProperty()
	@Column({nullable: true})
	refreshToken: string

	@ApiProperty()
	@OneToOne(() => ProfileEntity, (profile) => profile.auth)
	profileEntity: ProfileEntity

	@ApiProperty()
	@OneToOne(() => EmailEntity, (email) => email.auth)
	emailEntity: EmailEntity

	@ApiProperty()
	@OneToOne(() => PasswordEntity, (password) => password.auth)
	passwordEntity: EmailEntity

	@ApiProperty()
	@OneToMany(() => NewsEntity, (news) => news.auth)
	newsEntity: NewsEntity
}