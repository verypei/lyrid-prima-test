import { IsDefined, IsEnum, IsNotEmpty } from "class-validator";
import { RoleType } from "src/enum/role.enum";
import { IsValidEmail } from "src/helpers/email.decorator";
import { IsStrongPassword } from "src/helpers/password.decorator";



export class LoginDTO {
    @IsDefined()
    @IsValidEmail()
    email: string;

    @IsDefined()
    password: string;

    @IsDefined()
    @IsEnum(RoleType, { message: "Role must be USER, STAFF, SUPERVISOR, ADMIN, HRD or SUPER_ADMIN" })
    @IsNotEmpty()
    role: string;
}