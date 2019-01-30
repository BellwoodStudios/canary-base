import { Injectable, ForbiddenException } from '@nestjs/common';
import { User } from './user.entity';
import { BaseUserService } from '@bellwoodstudios/canary/baseuser';
import { Repository } from 'typeorm';
import { AuthService } from '@bellwoodstudios/canary/auth';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseUserService<User> {

	constructor (
		@InjectRepository(User) private readonly userRepository:Repository<User>,
		private readonly authService:AuthService,
	) {
		super();
	}

	async getUserByToken (token:string):Promise<User> {
		return new User();
	}

	async tryLogin (email:string, password:string):Promise<User> {
		const user = await this.userRepository.findOne({ email });
		if (user != null && user.validatePassword(password)) {
			// Store the token
			const jwt = await this.authService.generateJwt(email);
			user.token = jwt;

			return user;
		} else {
			throw new ForbiddenException('Invalid credentials.');
		}
	}

}
