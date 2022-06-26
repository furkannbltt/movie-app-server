"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Message = mongoose_1.default.model("Comment", new mongoose_1.default.Schema({
    comment: {
        type: String, required: true
    },
    id: {
        type: String, required: true
    },
    sender: {
        type: String, required: true
    },
}, {
    timestamps: true,
}), "Comment");
exports.default = Message;
