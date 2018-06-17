import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ContactService } from './contact.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit{
    constructor(private authService: AuthService, private contactService: ContactService, private router: Router) {}

    @Input() isResultsList: boolean;
    @Input() users: User[] = [];
    @Input() contacts: User[] = [];
    @Output() onCall = new EventEmitter<string>();
    @Output() onAddContact = new EventEmitter<number>();

    ngOnInit() {

    }

    loadContacts() {
    }
    
    onCallContact(e) {
        var username = e.currentTarget.dataset.username;
    
        this.onCall.emit(username);
    }

    onAdd(e) {
        var index = e.currentTarget.dataset.index;
        //this.onAddContact.emit(index);
    }
}