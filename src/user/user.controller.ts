import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

	constructor (
		private readonly userService:UserService,
	) {}

	@Get('login')
	async doLogin (@Query('email') email:string, @Query('password') password:string):Promise<any> {
		return (await this.userService.tryLogin(email, password));
	}

}
