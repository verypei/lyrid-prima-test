"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEmail = void 0;
const class_validator_1 = require("class-validator");
function IsValidEmail(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isValidEmail",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return typeof value === "string" &&
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                defaultMessage(args) {
                    return "Invalid email format. Example: user@example.com";
                }
            }
        });
    };
}
exports.IsValidEmail = IsValidEmail;
//# sourceMappingURL=email.decorator.js.map