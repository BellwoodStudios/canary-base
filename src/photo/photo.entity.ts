import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Model } from '@bellwoodstudios/canary/database';
import { User } from '../user/user.entity';

@Entity()
export class Photo extends Model {

	@Column({ length: 500 })
	name:string;

	@Column('text')
	description:string;

	@Column()
	filename:string;

	@Column('int')
	views:number;

	@Column()
	isPublished:boolean;

	@ManyToOne(type => User, user => user.id)
	owner:User;

	getOwner ():User {
		return this.owner;
	}

}
