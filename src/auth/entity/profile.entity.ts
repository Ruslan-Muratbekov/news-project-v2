import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AuthEntity} from "./auth.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'profile'})
export class ProfileEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty()
	@Column({nullable: true})
	username: string

	@ApiProperty()
	@Column({nullable: true})
	first_name: string

	@ApiProperty()
	@Column({nullable: true})
	last_name: string

	@ApiProperty()
	@Column({name: 'authId', nullable: true})
	authId: number

	@ApiProperty()
	@OneToOne(() => AuthEntity, (auth) => auth.id, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn()
	auth: AuthEntity
}