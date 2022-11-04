"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var logger_1 = __importDefault(require("./lib/logger"));
var metadata_keys_1 = __importDefault(require("../dist/utils/metadata.keys"));
var ExpressApplication = /** @class */ (function () {
    function ExpressApplication(port, middlewares, controllers) {
        this.port = port;
        this.middlewares = middlewares;
        this.controllers = controllers;
        this.app = (0, express_1.default)();
        this.port = port;
        // __init__
        this.setupMiddlewares(middlewares);
        this.setupRoutes(controllers);
        this.configureAssets();
        this.setUpLogger();
    }
    ExpressApplication.prototype.setupMiddlewares = function (middlewareArray) {
        var _this = this;
        middlewareArray.forEach(function (middleware) {
            _this.app.use(middleware);
        });
    };
    ExpressApplication.prototype.configureAssets = function () {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    };
    ExpressApplication.prototype.setUpLogger = function () {
        if (process.env.NODE_ENV === 'development') {
            this.app.use((0, morgan_1.default)('development'));
        }
    };
    ExpressApplication.prototype.setupRoutes = function (controllers) {
        var _this = this;
        var info = [];
        controllers.forEach(function (Controller) {
            var controllerInstance = new Controller();
            var basePath = Reflect.getMetadata(metadata_keys_1.default.BASE_PATH, Controller);
            var routers = Reflect.getMetadata(metadata_keys_1.default.ROUTERS, Controller);
            var expressRouter = express_1.default.Router();
            routers.forEach(function (_a) {
                var method = _a.method, handlerPath = _a.handlerPath, middlewares = _a.middlewares, handlerName = _a.handlerName;
                if (middlewares) {
                    expressRouter[method].apply(expressRouter, __spreadArray(__spreadArray([handlerPath], middlewares, false), [controllerInstance[String(handlerName)].bind(controllerInstance)], false));
                }
                else {
                    expressRouter[method](handlerPath, controllerInstance[String(handlerName)].bind(controllerInstance));
                }
                info.push({
                    api: "".concat(method.toLocaleLowerCase(), " ").concat(basePath + handlerPath),
                    handler: "".concat(Controller.name, ".").concat(String(handlerPath))
                });
            });
            _this.app.use(basePath, expressRouter);
        });
    };
    ExpressApplication.prototype.start = function () {
        var _this = this;
        return this.app.listen(this.port, function () {
            logger_1.default.info("Application is running on port ".concat(_this.port));
        });
    };
    return ExpressApplication;
}());
exports.default = ExpressApplication;
//# sourceMappingURL=bootstrapper.js.map