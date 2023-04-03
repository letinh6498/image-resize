"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImageFormat = void 0;
var path_1 = __importDefault(require("path"));
var ALLOWED_IMAGE_FORMATS = ['jpeg', 'png', 'jpg'];
var checkImageFormat = function (req, res, next) {
    var imageName = req.query.imageName;
    var imageFormat = path_1.default.extname(imageName).slice(1);
    if (!ALLOWED_IMAGE_FORMATS.includes(imageFormat)) {
        res.status(400).send('Invalid file extension');
        return;
    }
    next();
};
exports.checkImageFormat = checkImageFormat;
