"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const films_1 = require("../controllers/films");
const router = express_1.default.Router();
router.post("/", films_1.getFilms);
router.post("/detail", films_1.filmDetail);
router.post("/search", films_1.searchFilms);
exports.default = router;
