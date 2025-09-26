"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStrongPassword = void 0;
const class_validator_1 = require("class-validator");
function IsStrongPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isStrongPassword",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return typeof value === "string" &&
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
                },
                defaultMessage(args) {
                    return "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
                }
            }
        });
    };
}
exports.IsStrongPassword = IsStrongPassword;
//# sourceMappingURL=password.decorator.js.map