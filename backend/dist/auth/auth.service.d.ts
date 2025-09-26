import { Users } from 'src/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: typeof Users, jwtService: JwtService);
    login(loginData: any): unknown;
    register(registerDto: any): unknown;
}
