import { Base, uid } from "../test";
import * as firebase from '@firebase/testing';
import {fakekey} from '../mock/test';

@suite('Company table:')
class Company extends Base{
    @test async "anyone can read"() {
        const db = this.unAuthedApp();
        await firebase.assertSucceeds(db.ref(`company`).once("value"))
    }

    @test async "no one can write except adminauth"() {
        const db = this.authedApp({ uid: uid });
        await firebase.assertFails(db.ref(`company`).set({fakekey}))
    }
}