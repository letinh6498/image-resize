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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../index");
var supertest_1 = __importDefault(require("supertest"));
var sharp_1 = __importDefault(require("sharp"));
describe('resizeImage', function () {
    var response;
    var imageName = 'image.png';
    var width = 100;
    var height = 100;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/image?imageName=".concat(imageName, "&width=").concat(width, "&height=").concat(height))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should resize the image based on the provided query parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(response.status).toBe(200);
            return [2 /*return*/];
        });
    }); });
    it('should resize the image to 100 x 100', function () { return __awaiter(void 0, void 0, void 0, function () {
        var metadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, sharp_1.default)(response.body).metadata()];
                case 1:
                    metadata = _a.sent();
                    expect(metadata.width).toEqual(100);
                    expect(metadata.height).toEqual(100);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('check middleware', function () {
    var response;
    var imageName = 'image.pnx';
    var width = 100;
    var height = 100;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/image?imageName=".concat(imageName, "&width=").concat(width, "&height=").concat(height))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a status code of 400 if the file extension is not allowed', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid file extension');
            return [2 /*return*/];
        });
    }); });
    xit('should call the next middleware if the file extension is allowed', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(response.status).toBe(200);
            expect(response.ok).toBe(true);
            return [2 /*return*/];
        });
    }); });
});
describe('check Image Exist ', function () {
    var response;
    var imageName = 'imageNotFound.png';
    var width = 100;
    var height = 100;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/image?imageName=".concat(imageName, "&width=").concat(width, "&height=").concat(height))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a status code of 404 if the image is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(response.status).toBe(404);
            expect(response.text).toBe('Image not found');
            return [2 /*return*/];
        });
    }); });
});
describe('check An error occurred while resizing the image', function () {
    var response;
    var imageName = 'image.png';
    var width = 100000;
    var height = 100000;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/image?imageName=".concat(imageName, "&width=").concat(width, "&height=").concat(height))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a status code of 500 if An error occurred while resizing the image', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(response.status).toBe(500);
            expect(response.text).toBe('An error occurred while resizing the image.');
            return [2 /*return*/];
        });
    }); });
});
describe('check query', function () {
    var response;
    var imageName = 'image.png';
    var width = 'a';
    var height = 100;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/image?imageName=".concat(imageName, "&width=").concat(width, "&height=").concat(height))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a status code of 400 if Width and height not valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(response.status).toBe(400);
            expect(response.text).toBe('Width and height must be positive integers');
            return [2 /*return*/];
        });
    }); });
});
