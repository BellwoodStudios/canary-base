import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Model } from '@bellwoodstudios/canary/database';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Photo extends Model {

	@Column({ length: 500 })
	@Field()
	name:string;

	@Column('text')
	@Field()
	description:string;

	@Column()
	@Field()
	filename:string;

	@Column('int')
	@Field()
	views:number;

	@Column()
	@Field()
	isPublished:boolean;

	@ManyToOne(type => User, user => user.id)
	owner:User;

	getOwner ():User {
		return this.owner;
	}

}
