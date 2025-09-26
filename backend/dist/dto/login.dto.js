"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDTO = void 0;
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../enum/role.enum");
const email_decorator_1 = require("../helpers/email.decorator");
class LoginDTO {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, email_decorator_1.IsValidEmail)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(role_enum_1.RoleType, { message: "Role must be USER, STAFF, SUPERVISOR, ADMIN, HRD or SUPER_ADMIN" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "role", void 0);
exports.LoginDTO = LoginDTO;
//# sourceMappingURL=login.dto.js.map