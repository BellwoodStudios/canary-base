import { BaseUser } from '@bellwoodstudios/canary/baseuser/baseuser.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements BaseUser {

	@PrimaryGeneratedColumn()
	id:number;

	@Column({ length: 250 })
	email:string;

	getToken ():string {
		return 'A TOKEN';
	}

}
