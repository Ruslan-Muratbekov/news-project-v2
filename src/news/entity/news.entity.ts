import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn, ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {AuthEntity} from "../../auth/entity/auth.entity";
import {TagsEntity} from "../../tags/entity/tags.entity";
import {CategoryEntity} from "../../categories/entity/category.entity";

@Entity('news')
export class NewsEntity {
	@ApiProperty({required: false})
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty()
	@Column({nullable: false})
	title: string

	@ApiProperty({required: false})
	@Column()
	image: string

	@ApiProperty()
	@Column({nullable: false})
	description: string

	@ApiProperty()
	@Column({nullable: false})
	content: string

	@ApiProperty({required: false})
	@Column()
	views: string

	@ApiProperty({required: false})
	@Column({default: false})
	is_published: boolean

	@ApiProperty()
	@Column({nullable: false})
	category: string

	@ApiProperty()
	@Column({nullable: false})
	author: string

	@ApiProperty()
	@Column({nullable: false})
	tags: string

	@ApiProperty({required: false})
	@CreateDateColumn()
	created_at: string

	@ApiProperty({required: false})
	@UpdateDateColumn()
	updated_at: string


	@ApiProperty()
	@ManyToOne(() => AuthEntity, (auth) => auth, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn()
	auth: AuthEntity

	@ApiProperty()
	@ManyToOne(() => TagsEntity, (tag) => tag)
	@JoinColumn()
	tagsEntity: TagsEntity

	@ApiProperty()
	@ManyToOne(() => CategoryEntity, (category) => category)
	@JoinColumn()
	categoryEntity: CategoryEntity
}