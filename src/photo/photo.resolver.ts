import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PhotoService } from './photo.service';
import { Photo } from '../photo/photo.entity';
import { NotFoundException } from '@nestjs/common';
import { Int } from 'type-graphql';
import { AlwaysAllow } from '@bellwoodstudios/canary/role';
import { NewPhotoInput } from './photo.dto';
import { PubSub } from 'apollo-server-express';

const pubSub = new PubSub();

@Resolver(of => Photo)
export class PhotoResolver {

	constructor (private readonly photoService:PhotoService) {}

	@AlwaysAllow()
	@Query(returns => Photo)
	async photo (@Args({ name: 'id', type: () => Int }) id:number):Promise<Photo> {
		const photo = await this.photoService.findOne(id);
		if (!photo) {
			throw new NotFoundException(id);
		}
		return photo;
	}

	@Mutation(returns => Photo)
	async addPhoto (@Args('newPhotoData') newPhotoData:NewPhotoInput):Promise<Photo> {
		const photo = await this.photoService.create(newPhotoData);
		pubSub.publish('photoAdded', { photoAdded:photo });
		return photo;
	}

	@Subscription(returns => Photo)
	photoAdded () {
		return pubSub.asyncIterator('photoAdded');
	}

}
