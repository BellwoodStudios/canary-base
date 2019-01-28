import { Injectable } from '@nestjs/common';
import { ConfigService } from '@bellwoodstudios/canary/config/config.service';

@Injectable()
export class AppService {

	constructor (private readonly configService:ConfigService) {}

	getHello ():string {
		return this.configService.config.get('database').type;
	}

}
