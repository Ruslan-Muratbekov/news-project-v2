import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {NewsEntity} from "../../news/entity/news.entity";

@Entity('tags')
export class TagsEntity {
	@ApiProperty({required: false})
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({required: true})
	@Column()
	title: string

	@ApiProperty({required: false})
	@CreateDateColumn({nullable: true})
	created_at: string

	@ApiProperty({required: false})
	@UpdateDateColumn({nullable: true})
	updated_at: string

	@ApiProperty()
	@OneToMany(() => NewsEntity, (news) => news)
	newsEntity: NewsEntity
}