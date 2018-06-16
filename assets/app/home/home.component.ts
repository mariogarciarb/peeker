import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

    constructor(private router: Router) {}

    ngOnInit() {
        if (!this.isAuthenticated()) {            
            this.router.navigateByUrl('/auth');
            return;
        }
    }

    isAuthenticated() {
        return localStorage.getItem('token');
    }

    onStart() {
        this.router.navigateByUrl('/chat');
    }
}