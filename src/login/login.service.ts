import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '@bellwoodstudios/canary/auth';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {

	constructor (
		private readonly authService:AuthService,
		@InjectRepository(User) private readonly userRepository:Repository<User>,
	) {}

	async tryLogin (email:string, password:string):Promise<User> {
		const user = await this.userRepository.findOne({ email });
		if (user != null && user.validatePassword(password)) {
			// Store the token
			const jwt = await this.authService.generateToken(email);
			user.token = jwt;

			return user;
		} else {
			throw new UnauthorizedException('Invalid credentials.');
		}
	}

}
