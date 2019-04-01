import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PhotoService } from './photo.service';
import { Photo } from '../photo/photo.entity';
import { NotFoundException } from '@nestjs/common';

@Resolver(of => Photo)
export class PhotoResolver {

	constructor (private readonly photoService:PhotoService) {}

	@Query(returns => Photo)
	async photo (@Args('id') id:string):Promise<Photo> {
		const photo = await this.photoService.findOne(id);
		if (!photo) {
			throw new NotFoundException(id);
		}
		return photo;
	}

}
