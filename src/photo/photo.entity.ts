import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Model } from '@bellwoodstudios/canary/database';
import { OwnedEntity } from '@bellwoodstudios/canary/role';
import { User } from '../user/user.entity';

@Entity()
export class Photo extends Model implements OwnedEntity<User> {

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
