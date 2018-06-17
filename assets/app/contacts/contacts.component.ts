import { Component, OnInit, Output, Input } from '@angular/core';
import { ContactService } from './contact.service';
import { User } from '../auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
    public contacts: User[];
    public fetchedUsers: User[];
    public usersToShow: User[] = [];
    public isResultsList: boolean = false;

    constructor(private contactService: ContactService, private router: Router, private authService: AuthService) {}
    ngOnInit() {
        this.authService.isSessionExpired()
        .subscribe(
            (expired: boolean) => {
                if (expired) {
                    this.authService.logout();
                    this.router.navigateByUrl('/auth');
                    return;
                }

                this.loadContacts();
            },  (err) => {
                
                this.authService.logout();
                this.router.navigateByUrl('/auth');
                }
        );
    }

    loadContacts() {        
        this.contactService.getContacts()
        .subscribe(
            (contacts: User[]) => {
                this.contacts = contacts;
                this.usersToShow = this.contacts;
            },  (data) => {
                    if (this.authService.isSessionExpiredError(data.error)) {
                        this.authService.logout();
                        this.router.navigateByUrl('/auth');
                    }
                }
        );
    }
    onCall(username) {
        call(username);
    }

    onAddContact(index) {
        this.contactService.addContact(index);
        .subscribe(
            (added: boolean) => {
                console.log(added);
            }
        );
    }
    onTextClear(e) {
        this.usersToShow = this.contacts;
        this.isResultsList = false;
    }

    onTextChange(strUser) {
        this.search(strUser);
    }

    search(strUser) {
        this.contactService.searchContacts(strUser)
            .subscribe(
                (users: User[]) => {
                    console.log(users);
                    this.isResultsList = true;
                    this.fetchedUsers = users;
                    this.usersToShow = users;
                }
            );
    }
}