"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformLowerCase = void 0;
const class_transformer_1 = require("class-transformer");
function TransformLowerCase() {
    return (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value));
}
exports.TransformLowerCase = TransformLowerCase;
//# sourceMappingURL=lowerCase.decorator.js.map