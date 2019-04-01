import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { NewPhotoInput } from './photo.dto';

@Injectable()
export class PhotoService {
	constructor (
		@InjectRepository(Photo) private readonly photoRepository:Repository<Photo>,
	) {}

	async findAll ():Promise<Photo[]> {
		return await this.photoRepository.find({relations:['owner']});
	}

	async findOne (search):Promise<Photo> {
		return await this.photoRepository.findOne(search);
	}

	async create (newPhotoData:NewPhotoInput):Promise<Photo> {
		const photo = new Photo();
		photo.name = newPhotoData.name;
		photo.description = newPhotoData.description;
		photo.isPublished = newPhotoData.isPublished;
		return await this.photoRepository.save(photo);
	}

}
