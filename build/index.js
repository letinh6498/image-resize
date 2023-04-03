"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var checkImageFormat_1 = require("./middlewares/checkImageFormat");
var resizeImage_1 = require("./routes/resizeImage");
exports.app = (0, express_1.default)();
exports.app.use('/image', checkImageFormat_1.checkImageFormat, resizeImage_1.resizeImage);
exports.app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
