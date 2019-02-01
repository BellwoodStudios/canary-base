import { Injectable, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { BaseUserService } from '@bellwoodstudios/canary/baseuser';
import { Repository } from 'typeorm';
import { AuthService } from '@bellwoodstudios/canary/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class UserService implements BaseUserService<User> {

	constructor (
		@InjectRepository(User) private readonly userRepository:Repository<User>,
		@Inject(forwardRef(() => AuthService)) private readonly authService:AuthService,
	) {
	}

	async getUserByIdentifier (identifier:string):Promise<User> {
		return await this.userRepository.findOne({ email:identifier });
	}

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
