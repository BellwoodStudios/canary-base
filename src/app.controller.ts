import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from '@bellwoodstudios/canary/auth';

@Controller()
export class AppController {

	constructor (
		private readonly appService:AppService,
		private readonly authService:AuthService,
	) {}

	@Get()
	async getHello ():Promise<string> {
		return await this.appService.getHello();
	}

}
