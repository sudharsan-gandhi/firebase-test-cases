
/// <reference path='../node_modules/mocha-typescript/globals.d.ts' />
import * as firebase from '@firebase/testing';
// import * as testData from './test.json';
import { mock } from './mock/data';
import { user, true_user, fakekey } from './mock/test';
import * as fs from "fs";
// console.log(testData);

const databaseName = "icebrekr-development";
const coverageUrl = `http://localhost:9000/.inspect/coverage?ns=${databaseName}`;
const rules = fs.readFileSync("database.rules.json", "utf8");
const uid = "3kQFEZoivmWgKQGQLtIzqGsA2I73"

function authedApp(auth: any) {
    return firebase.initializeTestApp({ databaseName, auth }).database();
}

function unAuthedApp() {
    return firebase.initializeTestApp({ databaseName }).database();
}

function adminApp() {
    return firebase.initializeAdminApp({ databaseName }).database();
}

before(async () => {
    await firebase.loadDatabaseRules({ databaseName, rules });
});

beforeEach(async () => {
    // Clear the database between tests
    await adminApp()
        .ref()
        .set(null)
    await adminApp()
        .ref()
        .set(mock)
});

after(async () => {
    // Close any open apps
    await Promise.all(firebase.apps().map(app => app.delete()));
    console.log(`View rule coverage information at ${coverageUrl}\n`);
})


describe("users", () => {

    @suite('read rules:')
    class UserReads {
        @test async "without authentication token, user cannot read other users"() {
            const db = unAuthedApp();
            await firebase.assertFails(db.ref(`users/${uid}`).once("value"))
        }

        @test async "with authentication token, anyone can read"() {
            const db = authedApp({ uid: uid });
            await firebase.assertSucceeds(db.ref(`users/${uid}`).once("value"))
        }
    }

    @suite('write rules:')
    class UserWrites {

        @test async "without authentication token, new user cannot be created"() {
            const db = unAuthedApp();
            await firebase.assertFails(db.ref(`users/${uid}`).update({
                name: "billie jean"
            }))
        }

        @test async "with authentication token, new user can be created"() {
            const db = authedApp({ uid: '1234' });
            await firebase.assertSucceeds(db.ref(`users/1234`).set(user))
        }

        @test async "cannot update other user details"() {
            const db = authedApp({ uid: uid });
            await firebase.assertSucceeds(db.ref(`users/${uid}`).update(user))
        }

        @test async "can update only his own details"() {
            const db = authedApp({ uid: uid });
            await firebase.assertSucceeds(db.ref(`users/${uid}`).update(user))
        }

        @test async "cannot use keys which are not in db design to update or set"() {
            const db = authedApp({ uid: uid });
            await firebase.assertFails(db.ref(`users/${uid}`).set(fakekey))
            await firebase.assertFails(db.ref(`users/${uid}`).update(fakekey))
            await firebase.assertFails(db.ref(`users/${uid}/profile`).set(fakekey))
            await firebase.assertFails(db.ref(`users/${uid}/profile`).update(fakekey))
            await firebase.assertFails(db.ref(`users/${uid}/profile/personal`).set(fakekey))
            await firebase.assertFails(db.ref(`users/${uid}/profile/personal`).update(fakekey))
            await firebase.assertFails(db.ref(`users/${uid}/profile/professional`).set(fakekey))
            await firebase.assertFails(db.ref(`users/${uid}/profile/professional`).update(fakekey))
        }

        @test async "can use keys which are in db design to update or set"() {
            const db = authedApp({uid: '1234',email: true_user.email});
            await firebase.assertSucceeds(db.ref(`users/1234`).set(true_user))
            await firebase.assertSucceeds(db.ref(`users/1234`).update(true_user))
        }

        @test async "can update or set only if authed email and payload email are same"() {
            const db = authedApp({uid: '1234',email: true_user.email});
            await firebase.assertSucceeds(db.ref(`users/1234`).set(true_user))
            await firebase.assertSucceeds(db.ref(`users/1234`).update(true_user))
        }
    }
})






