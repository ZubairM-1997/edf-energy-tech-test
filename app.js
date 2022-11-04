"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var bootstrapper_1 = __importDefault(require("./bootstrapper"));
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("./lib/logger"));
require("reflect-metadata");
var book_controller_1 = __importDefault(require("./api/book/book.controller"));
dotenv_1.default.config({ path: "".concat(process.cwd(), "/.env.").concat(process.env.NODE_ENV) });
var PORT = process.env.PORT || 5000;
var app = new bootstrapper_1.default(PORT, [
    express_1.default.json({ limit: '10kb' }),
    express_1.default.urlencoded({ extended: true, limit: '10kb' })
], [
    book_controller_1.default
]);
var server = app.start();
process.on('SIGTERM', function () {
    logger_1.default.warn("SIGTERM RECIEVED!");
    server.close(function () {
        logger_1.default.warn('Process terminated!');
    });
});
//# sourceMappingURL=app.js.map