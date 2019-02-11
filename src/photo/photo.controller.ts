import { Controller, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Role } from '@bellwoodstudios/canary/role';
import { UserRole } from 'src/user/user.entity';
import { AllowIfLoggedIn } from '@bellwoodstudios/canary/role';

@Controller('/photos')
export class PhotoController {

	constructor (private readonly photoService:PhotoService) {}

	@Get()
	@AllowIfLoggedIn()
	async getPhotos ():Promise<string> {
		const photos = await this.photoService.findAll();
		return photos.map(p => p.name).join(', ');
	}

	@Get('/:id')
	@Role(UserRole.mod)
	async getPhoto (@Param('id') id:string):Promise<string> {
		const photo = await this.photoService.findOne({where:{ id }, relations:['owner']});
		return `${photo.name} owned by ${photo.owner.email}`;
	}

}
