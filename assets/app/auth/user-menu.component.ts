import { Component, OnInit } from "@angular/core";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-menu',
    templateUrl: 'user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit{
    loggedIn: boolean = false;
    constructor(private authService: AuthService, private router: Router) {}
    
    ngOnInit() {

    }
}