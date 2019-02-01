import { BaseUser } from '@bellwoodstudios/canary/baseuser';
import { Entity, Column } from 'typeorm';
import { RoleEntity } from '@bellwoodstudios/canary/role';

export enum UserRole {
	admin = 'admin',
	mod = 'mod',
	user = 'user',
}

@Entity()
export class User extends BaseUser implements RoleEntity {

	@Column({ length: 250 })
	email:string;

	@Column({ length: 250 })
	password:string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.user,
	})
	role:UserRole;

	token:string;

	getIdentifier ():string {
		return this.email;
	}

	validatePassword (password:string):boolean {
		return this.password === password;
	}

	getRole ():string {
		return this.role;
	}

}
