/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginData: LoginDTO) {
        try {
            return await this.authService.login(loginData)
        } catch (error) {
            throw error
        }
    }

    @Post('register')
    async register(@Body() registerData: LoginDTO) {
        try {
            return await this.authService.register(registerData)
        } catch (error) {
            throw error
        }
    }
}
