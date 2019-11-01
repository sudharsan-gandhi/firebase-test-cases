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
/// <reference path='../node_modules/mocha-typescript/globals.d.ts' />
const firebase = require("@firebase/testing");
// import * as testData from './test.json';
const data_1 = require("./mock/data");
const test_1 = require("./mock/test");
const fs = require("fs");
// console.log(testData);
const databaseName = "icebrekr-development";
const coverageUrl = `http://localhost:9000/.inspect/coverage?ns=${databaseName}`;
const rules = fs.readFileSync("database.rules.json", "utf8");
const uid = "3kQFEZoivmWgKQGQLtIzqGsA2I73";
function authedApp(auth) {
    return firebase.initializeTestApp({ databaseName, auth }).database();
}
function unAuthedApp() {
    return firebase.initializeTestApp({ databaseName }).database();
}
function adminApp() {
    return firebase.initializeAdminApp({ databaseName }).database();
}
before(() => __awaiter(this, void 0, void 0, function* () {
    yield firebase.loadDatabaseRules({ databaseName, rules });
}));
beforeEach(() => __awaiter(this, void 0, void 0, function* () {
    // Clear the database between tests
    yield adminApp()
        .ref()
        .set(null);
    yield adminApp()
        .ref()
        .set(data_1.mock);
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    // Close any open apps
    yield Promise.all(firebase.apps().map(app => app.delete()));
    console.log(`View rule coverage information at ${coverageUrl}\n`);
}));
describe("users", () => {
    let UserReads = class UserReads {
        "without authentication token, user cannot read other users"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = unAuthedApp();
                yield firebase.assertFails(db.ref(`users/${uid}`).once("value"));
            });
        }
        "with authentication token, anyone can read"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = authedApp({ uid: uid });
                yield firebase.assertSucceeds(db.ref(`users/${uid}`).once("value"));
            });
        }
    };
    __decorate([
        test
    ], UserReads.prototype, "without authentication token, user cannot read other users", null);
    __decorate([
        test
    ], UserReads.prototype, "with authentication token, anyone can read", null);
    UserReads = __decorate([
        suite('read rules:')
    ], UserReads);
    let UserWrites = class UserWrites {
        "without authentication token, new user cannot be created"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = unAuthedApp();
                yield firebase.assertFails(db.ref(`users/${uid}`).update({
                    name: "billie jean"
                }));
            });
        }
        "with authentication token, new user can be created"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = authedApp({ uid: '1234' });
                yield firebase.assertSucceeds(db.ref(`users/1234`).set(test_1.user));
            });
        }
        "cannot update other user details"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = authedApp({ uid: uid });
                yield firebase.assertSucceeds(db.ref(`users/${uid}`).update(test_1.user));
            });
        }
        "can update only his own details"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = authedApp({ uid: uid });
                yield firebase.assertSucceeds(db.ref(`users/${uid}`).update(test_1.user));
            });
        }
        "cannot use keys which are not in db design to update or set"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = authedApp({ uid: uid });
                yield firebase.assertFails(db.ref(`users/${uid}`).set(test_1.fakekey));
                yield firebase.assertFails(db.ref(`users/${uid}`).update(test_1.fakekey));
                yield firebase.assertFails(db.ref(`users/${uid}/profile`).set(test_1.fakekey));
                yield firebase.assertFails(db.ref(`users/${uid}/profile`).update(test_1.fakekey));
                yield firebase.assertFails(db.ref(`users/${uid}/profile/personal`).set(test_1.fakekey));
                yield firebase.assertFails(db.ref(`users/${uid}/profile/personal`).update(test_1.fakekey));
                yield firebase.assertFails(db.ref(`users/${uid}/profile/professional`).set(test_1.fakekey));
                yield firebase.assertFails(db.ref(`users/${uid}/profile/professional`).update(test_1.fakekey));
            });
        }
        "can use keys which are in db design to update or set"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = authedApp({ uid: '1234', email: test_1.true_user.email });
                yield firebase.assertSucceeds(db.ref(`users/1234`).set(test_1.true_user));
                yield firebase.assertSucceeds(db.ref(`users/1234`).update(test_1.true_user));
            });
        }
        "can update or set only if authed email and payload email are same"() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = authedApp({ uid: '1234', email: test_1.true_user.email });
                yield firebase.assertSucceeds(db.ref(`users/1234`).set(test_1.true_user));
                yield firebase.assertSucceeds(db.ref(`users/1234`).update(test_1.true_user));
            });
        }
    };
    __decorate([
        test
    ], UserWrites.prototype, "without authentication token, new user cannot be created", null);
    __decorate([
        test
    ], UserWrites.prototype, "with authentication token, new user can be created", null);
    __decorate([
        test
    ], UserWrites.prototype, "cannot update other user details", null);
    __decorate([
        test
    ], UserWrites.prototype, "can update only his own details", null);
    __decorate([
        test
    ], UserWrites.prototype, "cannot use keys which are not in db design to update or set", null);
    __decorate([
        test
    ], UserWrites.prototype, "can use keys which are in db design to update or set", null);
    __decorate([
        test
    ], UserWrites.prototype, "can update or set only if authed email and payload email are same", null);
    UserWrites = __decorate([
        suite('write rules:')
    ], UserWrites);
});
//# sourceMappingURL=test.js.map