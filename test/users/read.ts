import { Base, uid } from "../test";
import * as firebase from '@firebase/testing';

@suite('users table read:')
class Read extends Base{
    static async before() {
        return await Base.before();
    }

    static async after() {
        return await Base.after();
    }

    async before(){
        return await super.before();
    }

    @test async "without authentication token, user cannot read other users"() {
        const db = this.unAuthedApp();
        await firebase.assertFails(db.ref(`users/${uid}`).once("value"))
    }

    @test async "with authentication token, anyone can read"() {
        const db = this.authedApp({ uid: uid });
        await firebase.assertSucceeds(db.ref(`users/${uid}`).once("value"))
    }
}