"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../test");
const firebase = require("@firebase/testing");
let Read = class Read extends test_1.Base {
    static before() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield test_1.Base.before();
        });
    }
    static after() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield test_1.Base.after();
        });
    }
    before() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super("before").call(this);
        });
    }
    "without authentication token, user cannot read other users"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.unAuthedApp();
            yield firebase.assertFails(db.ref(`users/${test_1.uid}`).once("value"));
        });
    }
    "with authentication token, anyone can read"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.authedApp({ uid: test_1.uid });
            yield firebase.assertSucceeds(db.ref(`users/${test_1.uid}`).once("value"));
        });
    }
};
__decorate([
    test
], Read.prototype, "without authentication token, user cannot read other users", null);
__decorate([
    test
], Read.prototype, "with authentication token, anyone can read", null);
Read = __decorate([
    suite('users table read:')
], Read);
//# sourceMappingURL=read.js.map