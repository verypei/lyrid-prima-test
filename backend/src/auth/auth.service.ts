/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/constants';
import { Users } from 'src/entity/users.entity';
import * as argon2 from 'argon2';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @Inject(USERS_REPOSITORY) private readonly userRepository: typeof Users,
        private readonly jwtService: JwtService
    ) { }
    async login(loginData: any) {
        try {
            const user = await Users.findOne({ where: { email: loginData.email } });
            if (!user) {
                throw new UnauthorizedException('email not found');
            }
            const valid = await argon2.verify(user.password, loginData.password);

            if (!valid) {
                throw new UnauthorizedException('Wrong password');
            }
            const payload = { sub: user.id, email: user.email, role: user.role };

            const access_token = this.jwtService.sign(payload);

            return { access_token };
        } catch (error) {
            throw error
        }
    }

    async register(registerDto: any) {
        try {
            const existEmail = await this.userRepository.findOne({
                where: {
                    email: registerDto.email
                }
            })
            if (existEmail) { throw new HttpException("email already exist", HttpStatus.CONFLICT) }

            const hashed = await argon2.hash(registerDto.password)
            registerDto.password = hashed
            let data = await this.userRepository.create(registerDto)
            return data && "data created successfully"
        } catch (error) {
            throw error
        }
    }
}
