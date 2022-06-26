"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidation = exports.loginUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const loginUserValidation = (data) => {
    const joiUserSchema = joi_1.default.object({
        password: joi_1.default.string().required(),
        email: joi_1.default.string(),
        username: joi_1.default.string(),
    })
        .min(2)
        .max(2);
    return joiUserSchema.validate(data);
};
exports.loginUserValidation = loginUserValidation;
const createUserValidation = (data) => {
    const joiUserSchema = joi_1.default.object({
        password: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
    })
        .min(2)
        .max(2);
    return joiUserSchema.validate(data);
};
exports.createUserValidation = createUserValidation;
