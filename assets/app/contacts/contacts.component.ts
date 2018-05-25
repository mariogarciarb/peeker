import { Component, OnInit, Output } from '@angular/core';
import { ContactService } from './contact.service';
import { User } from '../auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
    contacts: User[];
    users: User[];
    form: FormGroup;

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
                    console.log(contacts);
                }
            );
        
        this.form = new FormGroup({
            username: new FormControl(null, Validators.required)
        });
    }

    onCall(e) {
        var username = e.target.dataset.username;
        
        // alert(username);
        // call(username);
    }
    
    onSubmit() {        
        this.contactService.searchContacts(this.form.value.username)
            .subscribe(
                (users: User[]) => {
                    this.users = users;
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
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token');
    }
}