import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsValidEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isValidEmail",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === "string" &&
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Basic email format validation
                },
                defaultMessage(args: ValidationArguments) {
                    return "Invalid email format. Example: user@example.com";
                }
            }
        });
    };
}
