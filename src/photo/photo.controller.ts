import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('/photos')
export class PhotoController {
	constructor (private readonly photoService:PhotoService) {}

	@Get()
	async getPhotos ():Promise<string> {
		const photos = await this.photoService.findAll();
		return photos.map(p => p.name).join(', ');
	}
}
