import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { BaseUserService } from '@bellwoodstudios/canary/baseuser';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService implements BaseUserService<User> {

	constructor (
		@InjectRepository(User) private readonly userRepository:Repository<User>,
	) {
	}

	async getUserByIdentifier (identifier:string):Promise<User> {
		return await this.userRepository.findOne({ email:identifier });
	}

}
