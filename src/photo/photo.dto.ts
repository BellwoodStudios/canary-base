import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewPhotoInput {

  @Field()
  @MaxLength(30)
  name:string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?:string;

  @Field()
  isPublished:boolean;

}
