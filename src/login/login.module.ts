import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { User } from 'src/user/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [LoginService],
	controllers: [LoginController],
	exports: [LoginService],
})
export class LoginModule {}
