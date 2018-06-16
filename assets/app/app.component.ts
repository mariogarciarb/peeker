import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit() {        
        this.authService.isSessionExpired()
        .subscribe(
            (expired: boolean) => {
                if (expired) {
                    this.authService.logout();
                    this.router.navigateByUrl('/auth');
                }
            },  (err) => {
                this.authService.logout();
                this.router.navigateByUrl('/auth');
                }
        );
    }
}