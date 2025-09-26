import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isStrongPassword",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === "string" &&
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
                }
            }
        });
    };
}
