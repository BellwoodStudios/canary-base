import { BaseUser } from '@bellwoodstudios/canary/baseuser';
import { Entity, Column } from 'typeorm';
import { RoleEntity } from '@bellwoodstudios/canary/role';
import { Exclude } from 'class-transformer';
import { Field, ID, ObjectType } from 'type-graphql';

export enum UserRole {
	admin = 'admin',
	mod = 'mod',
	user = 'user',
}

@Entity()
@ObjectType()
export class User extends BaseUser implements RoleEntity {

	@Column({ length: 250 })
	@Field()
	email:string;

	@Exclude()
	@Column({ length: 250 })
	@Field()
	password:string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.user,
	})
	@Field()
	role:UserRole;

	@Field()
	token:string;

	getIdentifier ():string {
		return this.email;
	}

	validatePassword (password:string):boolean {
		return this.password === password;
	}

	hasRole (role:string):boolean {
		return role === this.role;
	}

}
