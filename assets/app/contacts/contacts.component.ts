import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ContactService } from './contact.service';
import { User } from '../auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
    public contacts: User[] = [];
    public : User[] = [];
    public contactsToShow: User[] = [];
    public isResultsList: boolean = false;

    @Output() onCallEvent = new EventEmitter<string>();

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
                this.contactsToShow = this.contacts;
            },  (data) => {
                    if (this.authService.isSessionExpiredError(data.error)) {
                        this.authService.logout();
                        this.router.navigateByUrl('/auth');
                    }
                }
        );
    }
    onCall(username) {
        this.onCallEvent.emit(username);
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
        this.contactsToShow = this.contacts;
        this.fetchedUsers = [];
        this.isResultsList = false;
    }

    onTextChange(strUser) {
        this.search(strUser);
    }

    search(strUser) {
        this.contactService.searchContacts(strUser)
            .subscribe(
                (arr) => {
                    this.isResultsList = true;
                    this.contactsToShow =  arr[0];                    
                    this.fetchedUsers = arr[1];
                }
            );
    }
}