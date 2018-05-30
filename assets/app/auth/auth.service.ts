import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { User } from "./user.model";

//Observable imports
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { DataService } from "../data.service";

@Injectable()
export class AuthService{
    private URL: string;
    constructor(private http: Http, private data: DataService) {
        //Setting the URL by the service that contains global data updated.
        this.data.URL.subscribe(currentURL => this.URL = currentURL);
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.URL + '/user', body, {headers: headers})
            .map((response: Response) => response.json()).
            catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.URL + '/user/signin', body, {headers: headers})
            .map((response: Response) => response.json()).
            catch((error: Response) => Observable.throw(error.json()));
    }
    
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
    
    isSessionExpired(err: any) {
        return err.name === 'TokenExpiredError';
    }
    getUsername() {
        return localStorage.getItem('username');
    }

    search(strUsername: string) {
        const body = JSON.stringify(strUsername);
        
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.URL + '/user/search', body, {headers: headers})
            .map((response: Response) => response.json()).
            catch((error: Response) => Observable.throw(error.json()));
    }
    
    logout() {
        localStorage.clear();
    }
}