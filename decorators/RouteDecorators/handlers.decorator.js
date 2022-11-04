"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Methods = void 0;
var metadata_keys_1 = __importDefault(require("../../utils/metadata.keys"));
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["PUT"] = "put";
    Methods["POST"] = "post";
    Methods["DELETE"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
var decoratorFactory = function (method) {
    return function (path, middlewares) {
        return function (target, propertyKey) {
            var controlleerClass = target.constructor;
            var routers = Reflect.hasMetadata(metadata_keys_1.default.ROUTERS, controlleerClass)
                ? Reflect.getMetadata(metadata_keys_1.default.ROUTERS, controlleerClass)
                : [];
            routers.push({
                method: method,
                middlewares: middlewares,
                handlerPath: path,
                handlerName: propertyKey
            });
            Reflect.defineMetadata(metadata_keys_1.default.ROUTERS, routers, controlleerClass);
        };
    };
};
exports.Get = decoratorFactory(Methods.GET);
exports.Post = decoratorFactory(Methods.POST);
exports.Put = decoratorFactory(Methods.PUT);
exports.Delete = decoratorFactory(Methods.DELETE);
//# sourceMappingURL=handlers.decorator.js.map