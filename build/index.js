"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const comment_1 = __importDefault(require("./routes/comment"));
const films_1 = __importDefault(require("./routes/films"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    response.setTimeout(3000);
    if (request.method === "OPTIONS") {
        response.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return response.status(200).json({});
    }
    next();
});
app.use("/user", user_1.default);
app.use("/comment", comment_1.default);
app.use("/films", films_1.default);
app.use((request, response, next) => {
    const error = new Error("not found");
    return response.status(404).json({
        message: error.message,
    });
});
dotenv_1.default.config();
mongoose_1.default
    .connect(String(process.env.CONNECTION_URL))
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT}...`);
    });
})
    .catch((error) => {
    console.log(error);
});
