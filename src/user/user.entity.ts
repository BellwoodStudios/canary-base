import { BaseUser } from '@bellwoodstudios/canary/baseuser';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseUser {

	@Column({ length: 250 })
	email:string;

	@Column({ length: 250 })
	password:string;

	token:string;

	getToken ():string {
		return 'A TOKEN';
	}

	validatePassword (password:string):boolean {
		return this.password === password;
	}

}
