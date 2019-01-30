import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseUserModule } from '@bellwoodstudios/canary/baseuser';
import { AuthModule } from '@bellwoodstudios/canary/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';

@Module({
	imports: [BaseUserModule, AuthModule, TypeOrmModule.forFeature([User])],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}