import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProfileEntity} from "./profile.entity";
import {EmailEntity} from "./email.entity";
import {PasswordEntity} from "./password.entity";

@Entity({name: 'auth'})
export class AuthEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({unique: true, nullable: false})
	username: string

	@Column({nullable: true})
	email: string

	@Column({nullable: false})
	password: string

	@Column({nullable: true})
	first_name: string

	@Column({nullable: true})
	last_name: string

	@Column({nullable: true})
	refreshToken: string

	@OneToOne(() => ProfileEntity, (profile) => profile.auth)
	profileEntity: ProfileEntity

	@OneToOne(() => EmailEntity, (email) => email.auth)
	emailEntity: EmailEntity

	@OneToOne(() => PasswordEntity, (password) => password.auth)
	passwordEntity: EmailEntity
}