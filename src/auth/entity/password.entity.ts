import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AuthEntity} from "./auth.entity";

@Entity({name: 'password'})
export class PasswordEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({nullable: true})
	token: string

	@Column({name: 'authId', nullable: true})
	authId: number

	@OneToOne(() => AuthEntity, (auth) => auth.id, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn()
	auth: AuthEntity
}