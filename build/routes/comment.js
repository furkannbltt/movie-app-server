"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = require("../controllers/comment");
const router = express_1.default.Router();
router.post("/new", comment_1.addComment);
router.post("/", comment_1.getComments);
exports.default = router;
