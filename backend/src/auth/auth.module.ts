/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from 'src/providers/users.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'supersecretkey', // change to env in production
            signOptions: { expiresIn: '1h' }, // token expiration
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService,
        ...usersProviders,],
})
export class AuthModule { }
