"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.addComment = void 0;
const validation_helper_1 = require("../utils/validation-helper");
const comment_1 = __importDefault(require("../models/comment"));
// export const delComment = async (
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) => {
//     try {
//         const { error } = delCommentValidation(request.body);
//         if (error) {
//             return response.status(400).json({ message: error.details[0].message });
//         }
//         const { id } = request.body;
//         const messages = await Message.find({
//             users: {
//                 $del: [from, to],
//             },
//         }).sort({ updatedAt: 1 });
//         const projectedMessages = messages.map((item) => {
//             return {
//                 fromSelf: item.sender.toString() === from,
//                 message: item.message.text,
//             };
//         });
//         response.json(projectedMessages);
//     } catch (ex) {
//         next(ex);
//     }
// };
const addComment = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, validation_helper_1.addCommentValidation)(request.body);
        if (error) {
            return response.status(400).json({ message: error.details[0].message });
        }
        const { comment, id, sender } = request.body;
        const data = yield comment_1.default.create({
            comment: comment,
            id: id,
            sender: sender,
        });
        if (data)
            return response.json({ status: true, error: "Comment added successfully." });
        else
            return response.json({ status: false, error: "Failed to add comment to the database" });
    }
    catch (ex) {
        next(ex);
    }
});
exports.addComment = addComment;
const getComments = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.body;
        const data = yield comment_1.default.find({ id: id });
        return response.json({ status: false, data });
    }
    catch (ex) {
        next(ex);
    }
});
exports.getComments = getComments;
