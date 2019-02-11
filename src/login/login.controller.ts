import { Controller, Get, Query } from '@nestjs/common';
import { AllowIfLoggedOut } from '@bellwoodstudios/canary/role';
import { LoginService } from './login.service';

@Controller()
export class LoginController {

	constructor (
		private readonly loginService:LoginService,
	) {}

	@Get('/login')
	@AllowIfLoggedOut()
	async doLogin (@Query('email') email:string, @Query('password') password:string):Promise<any> {
		return (await this.loginService.tryLogin(email, password));
	}

}
