import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AuthEntity} from "./auth.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'email'})
export class EmailEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty()
	@Column({nullable: true})
	token: string

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