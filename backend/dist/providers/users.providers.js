"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const constants_1 = require("../constants");
const users_entity_1 = require("../entity/users.entity");
exports.usersProviders = [
    {
        provide: constants_1.USERS_REPOSITORY,
        useValue: users_entity_1.Users,
    }
];
//# sourceMappingURL=users.providers.js.map