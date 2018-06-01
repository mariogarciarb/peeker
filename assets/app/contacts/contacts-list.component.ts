import { Component, OnInit, Output, Input } from '@angular/core';
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
    contacts: User[];
    users: User[];

    constructor(private authService: AuthService, private contactService: ContactService, private router: Router) {}

    ngOnInit() {
        if (!this.isAuthenticated()) {
            this.router.navigateByUrl('/auth');
            return;
        }
        
        this.contactService.getContacts()
            .subscribe(
                (contacts: User[]) => {
                    this.contacts = contacts;
                },  (data) => { 
                        if (this.authService.isSessionExpired(data.error)) {
                            this.authService.logout();
                            this.router.navigateByUrl('/auth');
                        }
                    }
            );

        initClient();
    }

    onCall(e) {
        var username = e.target.dataset.username;
        call(username);
    }

    isAuthenticated() {
        return localStorage.getItem('token');
    }
}