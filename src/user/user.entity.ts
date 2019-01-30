import { BaseUser } from '@bellwoodstudios/canary/baseuser/baseuser.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements BaseUser {

	@PrimaryGeneratedColumn()
	id:number;

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
