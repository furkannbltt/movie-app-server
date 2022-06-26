"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.post("/signup", user_1.createUser);
router.post("/signin", user_1.loginUser);
router.post("/favorite", user_1.userFavorite);
router.post("/favorites", user_1.getFavorites);
router.post("/send-email", user_1.sendEmail);
exports.default = router;
