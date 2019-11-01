"use strict";
/// <reference path='../node_modules/mocha-typescript/globals.d.ts' />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("@firebase/testing");
const data_1 = require("./mock/data");
const fs = require("fs");
const databaseName = "icebrekr-development";
const coverageUrl = `http://localhost:9000/.inspect/coverage?ns=${databaseName}`;
const rules = fs.readFileSync("database.rules.json", "utf8");
exports.uid = "3kQFEZoivmWgKQGQLtIzqGsA2I73";
//static before === beforeAll method
//before === beforeEach method
class Base {
    static before() {
        return __awaiter(this, void 0, void 0, function* () {
            //before each test case
            return yield firebase.loadDatabaseRules({ databaseName, rules });
        });
    }
    static after() {
        return __awaiter(this, void 0, void 0, function* () {
            // Close any open apps
            console.log(`View rule coverage information at ${coverageUrl}\n`);
            return yield Promise.all(firebase.apps().map(app => app.delete()));
        });
    }
    before() {
        return __awaiter(this, void 0, void 0, function* () {
            // Clear the database between tests
            yield this.adminApp()
                .ref()
                .set(null);
            yield this.adminApp()
                .ref()
                .set(data_1.mock);
        });
    }
    ;
    // async after() {
    //     return true;
    // }
    authedApp(auth) {
        return firebase.initializeTestApp({ databaseName, auth }).database();
    }
    unAuthedApp() {
        return firebase.initializeTestApp({ databaseName }).database();
    }
    adminApp() {
        return firebase.initializeAdminApp({ databaseName }).database();
    }
}
exports.Base = Base;
//# sourceMappingURL=test.js.map