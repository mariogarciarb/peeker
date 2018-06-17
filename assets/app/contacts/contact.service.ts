import { User } from "../auth/user.model";
import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

//Observable imports
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { DataService } from "../data.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ContactService {    
    private contacts: User[] = [];
    private fetchedUsers: User[] = [];
    private fetchedContacts: User[] = [];
    private URL: string = "";
    private currentUsername = this.authService.getUsername();
    constructor(private http: Http, private data: DataService, private authService: AuthService) {
        //Setting the URL by the service that contains global data updated.
        this.data.URL.subscribe(currentURL => this.URL = currentURL);
    }
    
    addContact(index: number) {
        const token = this.getToken();
        var user = this.fetchedUsers[index];

        //Adding user to the contacts list
        this.contacts.push(user);

        // Adding user to the current contact results list
        this.fetchedContacts.push(user);

        // Removing user from the current user result list
        this.fetchedUsers.splice(index, 1);

        const body = JSON.stringify(user);        
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.URL + '/contact/' + token, body, {headers: headers})
            .map((response: Response) => response.json().res).
            catch((error: Response) => Observable.throw(error.json()));

    }
    
    getContactsList() {
        return this.contacts;
    } 

    getFetchedContactsList() {
        return this.fetchedContacts;
    }
    
    getUsersList() {
        return this.fetchedUsers;
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
                    if (user.username !== this.currentUsername) {
                        transformedUsers.push(new User("", "", user.username, user.firstName, user.secondName));
                    }
                }
                
                // Getting all users that are in the contacts list
                this.fetchedContacts = transformedUsers.filter((iteratedUser) => this.isContact(iteratedUser));
                
                // Getting users that are not in the list of contacts that were fetched
                this.fetchedUsers = transformedUsers.filter((iteratedUser) => !this.fetchedContacts.includes(iteratedUser));
                return [this.fetchedContacts, this.fetchedUsers];
            }).
            catch((error: Response) => Observable.throw(error.json()));
    }

    getToken() {
        var token = localStorage.getItem('token');
        return (token) ? "?token=" + token : '';
    }

    isContact(user) {        
        return this.contacts.find((iteratedUser) => iteratedUser.username === user.username);
    }
}