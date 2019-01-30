import { Injectable, ForbiddenException } from '@nestjs/common';
import { User } from './user.entity';
import { BaseUserService } from '@bellwoodstudios/canary/baseuser/baseuser.service';
import { Repository } from 'typeorm';
import { AuthService } from '@bellwoodstudios/canary/auth/auth.service';
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

	async tryLogin (email:string):Promise<User> {
		const user = await this.userRepository.findOne({ email });
		if (user != null) {
			// Store the token
			this.authService.signIn(email);

			return user;
		} else {
			throw new ForbiddenException('Invalid credentials.');
		}
	}

}
