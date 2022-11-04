"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_keys_1 = __importDefault(require("../../utils/metadata.keys"));
var Controller = function (basePath) {
    return function (target) { return Reflect.defineMetadata(metadata_keys_1.default.BASE_PATH, basePath, target); };
};
exports.default = Controller;
//# sourceMappingURL=controller.decorator.js.map