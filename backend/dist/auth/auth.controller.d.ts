import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: LoginDTO): unknown;
    register(registerData: LoginDTO): unknown;
}
