import { Component, OnInit, Output, Input } from '@angular/core';
import { ContactService } from './contact.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.css']
})

export class ResultsListComponent implements OnInit{
    contacts: User[];
    users: User[];

    constructor(private contactService: ContactService, private router: Router) {}

    ngOnInit() {
        if (!this.isAuthenticated()) {
            this.router.navigateByUrl('/auth');
            return;
        }
        
        this.contactService.getContacts()
            .subscribe(
                (contacts: User[]) => {
                    this.contacts = contacts;
                }
            );
    }

    onAddContact(e) {
        var index = parseInt(e.target.dataset.index);
        this.contactService.addContact(index)
            .subscribe(
                (added: boolean) => {
                    console.log(added);
                }
            );
    }

    isAuthenticated() {
        return localStorage.getItem('token');
    }
}