import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AlwaysAllow } from '@bellwoodstudios/canary/role';

@Controller()
export class AppController {

	constructor (
		private readonly appService:AppService,
	) {}

	@AlwaysAllow()
	@Get()
	async getHello ():Promise<string> {
		return await this.appService.getHello();
	}

}
