import { User } from "../auth/user.model";
import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

//Observable imports
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { DataService } from "../data.service";

@Injectable()
export class ContactService {    
    private contacts: User[] = [];
    private fetchedUsers: User[] = [];
    private URL: string = "";

    constructor(private http: Http, private data: DataService) {
        //Setting the URL by the service that contains global data updated.
        this.data.URL.subscribe(currentURL => this.URL = currentURL);
    }
    
    addContact(index: number) {
        const token = this.getToken();
        var user = this.fetchedUsers[index];
        this.contacts.push(user);
        
        const body = JSON.stringify(user);        
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.URL + '/contact/' + token, body, {headers: headers})
            .map((response: Response) => response.json().res).
            catch((error: Response) => Observable.throw(error.json()));

    }

    getContacts() {
        //Not headers are needed since we're not sending any data.
        
        const token = this.getToken();
        return this.http.get(this.URL + '/contact/' + token)
            .map((response: Response) => {
                const contacts = response.json().contacts;
                let transformedContacts: User[] = [];

                //MongoDB stores users with some attributes that don't match the client User model.
                for (let contact of contacts) {
                    transformedContacts.push(new User("", "", contact.username, contact.firstName, contact.secondName))
                }

                this.contacts = transformedContacts;
                return transformedContacts;
            }).
            catch((error: Response) => Observable.throw(error.json()));
    }

    deleteContact(user: User) {
        this.contacts.splice(this.contacts.indexOf(user), 1);
    }

    searchContacts(username: string) {
        const body = JSON.stringify({username: username});
        const token = this.getToken();
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.URL + '/contact/search' + token, body, {headers: headers})
            .map((response: Response) => {
                const users = response.json().users;
                let transformedUsers: User[] = [];

                //MongoDB stores users with some attributes that don't match the client User model.
                for (let user of users) {
                    transformedUsers.push(new User("", "", user.username, user.firstName, user.secondName));
                }
                this.fetchedUsers = transformedUsers;
                return transformedUsers;
            }).
            catch((error: Response) => Observable.throw(error.json()));
    }

    getToken() {
        var token = localStorage.getItem('token');
        return (token) ? "?token=" + token : '';
    }
}