
/// <reference path='../node_modules/mocha-typescript/globals.d.ts' />

import * as firebase from '@firebase/testing';
import { mock } from './mock/data';
import * as fs from "fs";
const databaseName = "icebrekr-development";
const coverageUrl = `http://localhost:9000/.inspect/coverage?ns=${databaseName}`;
const rules = fs.readFileSync("database.rules.json", "utf8");
export const uid = "3kQFEZoivmWgKQGQLtIzqGsA2I73"

//static before === beforeAll method
//before === beforeEach method


export abstract class Base {
    static async before() {
        //before each test case
        return await firebase.loadDatabaseRules({ databaseName, rules });
    }

    static async after() {
        // Close any open apps
        console.log(`View rule coverage information at ${coverageUrl}\n`);
        return await Promise.all(firebase.apps().map(app => app.delete()));
    }

    async before() {
        // Clear the database between tests
        await this.adminApp()
            .ref()
            .set(null)
        await this.adminApp()
            .ref()
            .set(mock)
    };

    // async after() {
        
    //     return true;
    // }

    public authedApp(auth: any) {
        return firebase.initializeTestApp({ databaseName, auth }).database();
    }

    public unAuthedApp() {
        return firebase.initializeTestApp({ databaseName }).database();
    }
    
    public adminApp() {
        return firebase.initializeAdminApp({ databaseName }).database();
    }
}







