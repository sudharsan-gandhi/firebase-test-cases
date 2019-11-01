import { Base, uid } from "../test";
import * as firebase from '@firebase/testing';
import { user, fakekey, true_user } from "../mock/test";

@suite class Write extends Base {
    static async before() {
        return await Base.before();
    }

    static async after() {
        return await Base.after();
    }

    async before(){
        return await super.before();
    }

    @test async "without authentication token, new user cannot be created"() {
        const db = this.unAuthedApp();
        await firebase.assertFails(db.ref(`users/${uid}`).update({
            name: "billie jean"
        }))
    }

    @test async "with authentication token, new user can be created"() {
        const db = this.authedApp({ uid: '1234' });
        await firebase.assertSucceeds(db.ref(`users/1234`).set(user))
    }

    @test async "cannot update other user details"() {
        const db = this.authedApp({ uid: uid });
        await firebase.assertSucceeds(db.ref(`users/${uid}`).update(user))
    }

    @test async "can update only his own details"() {
        const db = this.authedApp({ uid: uid });
        await firebase.assertSucceeds(db.ref(`users/${uid}`).update(user))
    }

    @test async "cannot use keys which are not in db design to update or set"() {
        const db = this.authedApp({ uid: uid });
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
        const db = this.authedApp({ uid: '1234', email: true_user.email });
        await firebase.assertSucceeds(db.ref(`users/1234`).set(true_user))
        await firebase.assertSucceeds(db.ref(`users/1234`).update(true_user))
    }

    @test async "can update or set only if authed email and payload email are same"() {
        const db = this.authedApp({ uid: '1234', email: true_user.email });
        await firebase.assertSucceeds(db.ref(`users/1234`).set(true_user))
        await firebase.assertSucceeds(db.ref(`users/1234`).update(true_user))
    }
}