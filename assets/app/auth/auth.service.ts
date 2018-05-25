import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { User } from "./user.model";

//Observable imports
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    private domain: string = 'http://192.168.0.13:3000';
    constructor(private http: Http) {

    }
    signup(user: User) {
        const body = JSON.stringify(user);
        
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.domain + '/user', body, {headers: headers})
            .map((response: Response) => response.json()).
            catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.domain + '/user/signin', body, {headers: headers})
            .map((response: Response) => response.json()).
            catch((error: Response) => Observable.throw(error.json()));
    }

    search(strUsername: string) {
        const body = JSON.stringify(strUsername);
        
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.domain + '/user/search', body, {headers: headers})
            .map((response: Response) => response.json()).
            catch((error: Response) => Observable.throw(error.json()));
    }
    
    logout() {
        localStorage.clear();
    }
}