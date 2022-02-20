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
        while (_) try {
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
var supertest_1 = __importDefault(require("supertest"));
var createServer_1 = __importDefault(require("../utils/createServer"));
var app = (0, createServer_1.default)();
describe('parcel', function () {
    describe('get parcel route', function () {
        describe('get all parcels', function () {
            it('should return a 200', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, status, body;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/parcels")];
                        case 1:
                            _a = _b.sent(), status = _a.status, body = _a.body;
                            expect(status).toBe(200);
                            expect(body.status).toBe('success');
                            expect(body.data).toEqual(expect.arrayContaining([expect.any(Object)]));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('given parcel does not exist', function () {
            it('should return a 404', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parcelId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parcelId = 'test-123';
                            return [4 /*yield*/, (0, supertest_1.default)(app).get("/parcels/".concat(parcelId)).expect(404)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('given parcel does exist', function () {
            it('should return a 200 status and the parcel', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parcelId, _a, status, body;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parcelId = 2;
                            return [4 /*yield*/, (0, supertest_1.default)(app).get("/parcels/".concat(parcelId))];
                        case 1:
                            _a = _b.sent(), status = _a.status, body = _a.body;
                            expect(status).toBe(200);
                            expect(body.status).toBe('success');
                            expect(body.data).toEqual(expect.arrayContaining([expect.any(Object)]));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Add a new parcel with a name and weight parameter', function () {
            it('should return a 201 status and a succcess message', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, statusCode, body;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                                .post('/parcels')
                                .send({ name: 'testParcel', weight: 15.5 })];
                        case 1:
                            _a = _b.sent(), statusCode = _a.status, body = _a.body;
                            expect(statusCode).toBe(201);
                            expect(body.status).toEqual('success');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Add a new parcel without name and weight parameter', function () {
            it('should return a 400 status and an error message', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, statusCode, body;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                                .post('/parcels')
                                .send()];
                        case 1:
                            _a = _b.sent(), statusCode = _a.status, body = _a.body;
                            expect(statusCode).toBe(400);
                            expect(body.status).toEqual('error');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Update the parcel that does not exist', function () {
            it('should return a 404 status and a error message', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parcelId, _a, statusCode, body;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parcelId = 'test-123';
                            return [4 /*yield*/, (0, supertest_1.default)(app)
                                    .put("/trucks/".concat(parcelId))
                                    .send({ name: 'testParcel2', weight: 25.5 })];
                        case 1:
                            _a = _b.sent(), statusCode = _a.status, body = _a.body;
                            expect(statusCode).toBe(404);
                            expect(body.status).toEqual('error');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Update the parcel with a name and weight parameter', function () {
            it('should return a 200 status and a succcess message', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parcelId, _a, statusCode, body;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parcelId = 1;
                            return [4 /*yield*/, (0, supertest_1.default)(app)
                                    .put("/parcels/".concat(parcelId))
                                    .send({ name: 'updatedParcel', weight: 99 })];
                        case 1:
                            _a = _b.sent(), statusCode = _a.status, body = _a.body;
                            expect(statusCode).toBe(200);
                            expect(body.status).toEqual('success');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Delete a parcel by ID', function () {
            it('should return a 200 status and a succcess message', function () { return __awaiter(void 0, void 0, void 0, function () {
                var selectBody, parcelId, _a, statusCode, body;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get('/parcels/lastid')];
                        case 1:
                            selectBody = (_b.sent()).body;
                            parcelId = selectBody.data[0].id;
                            return [4 /*yield*/, (0, supertest_1.default)(app).delete("/parcels/".concat(parcelId))];
                        case 2:
                            _a = _b.sent(), statusCode = _a.status, body = _a.body;
                            expect(statusCode).toBe(200);
                            expect(body.status).toEqual('success');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Delete the parcel that does not exist', function () {
            it('should return a 404 status and a error message', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parcelId, _a, statusCode, body;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parcelId = 'test-123';
                            return [4 /*yield*/, (0, supertest_1.default)(app).delete("/parcels/".concat(parcelId))];
                        case 1:
                            _a = _b.sent(), statusCode = _a.status, body = _a.body;
                            expect(statusCode).toBe(404);
                            expect(body.status).toEqual('error');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
