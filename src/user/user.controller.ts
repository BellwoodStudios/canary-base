import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AllowIfLoggedOut } from '@bellwoodstudios/canary/role';

@Controller('/users')
export class UserController {

	constructor (
		private readonly userService:UserService,
	) {}

	@Get('/login')
	@AllowIfLoggedOut()
	async doLogin (@Query('email') email:string, @Query('password') password:string):Promise<any> {
		return (await this.userService.tryLogin(email, password));
	}

}
