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
exports.sendEmail = exports.getFavorites = exports.userFavorite = exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_helper_1 = require("../utils/validation-helper");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mymovie.center.app@gmail.com',
        pass: 'lalqwxvfavpxoqlx'
    }
});
const createUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, validation_helper_1.createUserValidation)(request.body);
        if (error) {
            return response
                .status(400)
                .json({ message: error.details[0].message });
        }
        const { email, password } = request.body;
        const mailControl = yield user_1.default.findOne({ email });
        if (mailControl)
            return response.json({ message: "Email already used", status: false });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const createUser = yield user_1.default.create({
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({
            "_id": createUser._id
        }, String(process.env.JWT_SECRET), { expiresIn: "365d" });
        return response.json({ status: true, token });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const loginUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, validation_helper_1.loginUserValidation)(request.body);
        if (error) {
            return response
                .status(400)
                .json({ message: error.details[0].message });
        }
        const { email, password } = request.body;
        const userControl = yield user_1.default.findOne({ email });
        if (!userControl)
            return response.json({ message: "Incorrect username or password", status: false });
        const passwordControl = yield bcrypt_1.default.compare(password, userControl === null || userControl === void 0 ? void 0 : userControl.password);
        if (!passwordControl)
            return next({ message: "Incorrect username or password", status: false });
        const token = jsonwebtoken_1.default.sign({
            "email": userControl.email,
            "favorites": userControl.userFavorites
        }, String(process.env.JWT_SECRET), { expiresIn: "365d" });
        return response.json({ status: true, token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const userFavorite = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, id } = request.body;
        const userControl = yield user_1.default.findOne({ email: email });
        console.log(userControl, "userControl");
        const idControl = yield user_1.default.findOne({ email: email, "userFavorites": { "id": id } });
        console.log(idControl, "deneme");
        if (userControl && !idControl) {
            yield user_1.default.findOneAndUpdate({ "email": email }, {
                $push: { "userFavorites": { id } }
            }, { new: true });
        }
        else if (userControl && idControl) {
            yield user_1.default.findOneAndUpdate({ "email": email }, {
                $pull: { "userFavorites": { id } }
            }, { new: true });
        }
        return response.json({ status: true });
    }
    catch (error) {
        next(error);
    }
});
exports.userFavorite = userFavorite;
const getFavorites = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        const user = yield user_1.default.findOne({ email: email });
        return response.json({ status: true, user });
    }
    catch (error) {
        next(error);
    }
});
exports.getFavorites = getFavorites;
const sendEmail = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, link } = request.body;
        var mailOptions = {
            from: from,
            to: to,
            subject: 'Movie Center Film Önerisi',
            html: `<html><body style="text-align:center;"><h2>Movie Center</h2><p>${from} kullanıcımızın film önerisi</p><a href="${link}" style="color:white; font-size:25px; border:none; padding:10px; background-color:red; border-radius:15px; border:1px solid red" onMouseOver="this.style.background="white", this.style.color="black""onMouseOut="this.style.background="red", this.style.color="white"">GİT</a></body></html>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return response.json({ status: false });
            }
            else {
                return response.json({ status: true });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendEmail = sendEmail;
