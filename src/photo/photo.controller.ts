import { Controller, Get, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Role, AlwaysAllow } from '@bellwoodstudios/canary/role';
import { UserRole } from 'src/user/user.entity';
import { FindOneDto } from '@bellwoodstudios/canary/dto';

@Controller('/photos')
export class PhotoController {

	constructor (private readonly photoService:PhotoService) {}

	@Get()
	@AlwaysAllow()
	async getPhotos () {
		const photos = await this.photoService.findAll();
		return photos;
	}

	@Get('/:id')
	@Role(UserRole.mod)
	@AlwaysAllow()
	async getPhoto (@Param() dto:FindOneDto) {
		const photo = await this.photoService.findOne({where:{ id:dto.id }, relations:['owner']});
		return `${photo.name} owned by ${photo.owner.email}`;
	}

}
