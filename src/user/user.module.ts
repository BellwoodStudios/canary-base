import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { APP_USER_SERVICE } from '@bellwoodstudios/canary/baseuser';
import { AuthModule } from '@bellwoodstudios/canary/auth';

@Module({
	imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
	providers: [
		UserService,
		{
			provide: APP_USER_SERVICE,
			useClass: UserService,
		},
	],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
