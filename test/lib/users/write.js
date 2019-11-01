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
const test_2 = require("../mock/test");
let Write = class Write extends test_1.Base {
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
    "without authentication token, new user cannot be created"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.unAuthedApp();
            yield firebase.assertFails(db.ref(`users/${test_1.uid}`).update({
                name: "billie jean"
            }));
        });
    }
    "with authentication token, new user can be created"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.authedApp({ uid: '1234' });
            yield firebase.assertSucceeds(db.ref(`users/1234`).set(test_2.user));
        });
    }
    "cannot update other user details"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.authedApp({ uid: test_1.uid });
            yield firebase.assertSucceeds(db.ref(`users/${test_1.uid}`).update(test_2.user));
        });
    }
    "can update only his own details"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.authedApp({ uid: test_1.uid });
            yield firebase.assertSucceeds(db.ref(`users/${test_1.uid}`).update(test_2.user));
        });
    }
    "cannot use keys which are not in db design to update or set"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.authedApp({ uid: test_1.uid });
            yield firebase.assertFails(db.ref(`users/${test_1.uid}`).set(test_2.fakekey));
            yield firebase.assertFails(db.ref(`users/${test_1.uid}`).update(test_2.fakekey));
            yield firebase.assertFails(db.ref(`users/${test_1.uid}/profile`).set(test_2.fakekey));
            yield firebase.assertFails(db.ref(`users/${test_1.uid}/profile`).update(test_2.fakekey));
            yield firebase.assertFails(db.ref(`users/${test_1.uid}/profile/personal`).set(test_2.fakekey));
            yield firebase.assertFails(db.ref(`users/${test_1.uid}/profile/personal`).update(test_2.fakekey));
            yield firebase.assertFails(db.ref(`users/${test_1.uid}/profile/professional`).set(test_2.fakekey));
            yield firebase.assertFails(db.ref(`users/${test_1.uid}/profile/professional`).update(test_2.fakekey));
        });
    }
    "can use keys which are in db design to update or set"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.authedApp({ uid: '1234', email: test_2.true_user.email });
            yield firebase.assertSucceeds(db.ref(`users/1234`).set(test_2.true_user));
            yield firebase.assertSucceeds(db.ref(`users/1234`).update(test_2.true_user));
        });
    }
    "can update or set only if authed email and payload email are same"() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.authedApp({ uid: '1234', email: test_2.true_user.email });
            yield firebase.assertSucceeds(db.ref(`users/1234`).set(test_2.true_user));
            yield firebase.assertSucceeds(db.ref(`users/1234`).update(test_2.true_user));
        });
    }
};
__decorate([
    test
], Write.prototype, "without authentication token, new user cannot be created", null);
__decorate([
    test
], Write.prototype, "with authentication token, new user can be created", null);
__decorate([
    test
], Write.prototype, "cannot update other user details", null);
__decorate([
    test
], Write.prototype, "can update only his own details", null);
__decorate([
    test
], Write.prototype, "cannot use keys which are not in db design to update or set", null);
__decorate([
    test
], Write.prototype, "can use keys which are in db design to update or set", null);
__decorate([
    test
], Write.prototype, "can update or set only if authed email and payload email are same", null);
Write = __decorate([
    suite
], Write);
//# sourceMappingURL=write.js.map