import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AuthEntity} from "./auth.entity";

@Entity({name: 'profile'})
export class ProfileEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({nullable: true})
	username: string

	@Column({nullable: true})
	first_name: string

	@Column({nullable: true})
	last_name: string

	@Column({name: 'authId', nullable: true})
	authId: number

	@OneToOne(() => AuthEntity, (auth) => auth.id, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn()
	auth: AuthEntity
}