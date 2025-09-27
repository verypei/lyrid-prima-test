/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from 'src/providers/users.providers';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/jwtStrategy';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret', // change to env in production
            signOptions: { expiresIn: '4h' }, // token expiration
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService,
        ...usersProviders, JwtStrategy],
    exports: [AuthService, JwtStrategy]
})
export class AuthModule { }
