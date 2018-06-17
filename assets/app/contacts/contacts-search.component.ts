import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ContactService } from './contact.service';
import { User } from '../auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contacts-search',
    templateUrl: './contacts-search.component.html',
    styleUrls: ['./contacts-search.component.css']
})
export class ContactsSearchComponent implements OnInit{
    form: FormGroup;

    @Output() onSearch = new EventEmitter<string>();
    @Output() textChanged = new EventEmitter<string>();
    @Output() textCleared = new EventEmitter<string>();

    constructor(private contactService: ContactService, private router: Router) {}
    
    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(null, Validators.required)
        });
    }
    
    onTextChanged(e) {
        if (!this.form.value.username.trim()) {            
            this.textCleared.emit('');
        } else {
            this.textChanged.emit(this.form.value.username);
        }
    }
    onSubmit(e) {
        this.onSearch.emit(this.form.value.username);
    }
}