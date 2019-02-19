import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PhotoService } from './photo.service';

@Resolver('Photo')
export class AuthorResolver {

	constructor (private readonly photoService:PhotoService) {}

	@Query()
	async author (@Args('id') id:number) {
		return await this.authorsService.findOneById(id);
	}

	@ResolveProperty()
	async posts (@Parent() author) {
		const { id } = author;
		return await this.postsService.findAll({ authorId: id });
	}
}
