import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit {
    form: FormGroup;

    constructor (private authService: AuthService, private router: Router) {}

    onSubmit() {
        const user = new User(
            this.form.value.email,
            this.form.value.password,
            this.form.value.username,
            this.form.value.firstName,
            this.form.value.secondName
        );
        
        this.authService.signup(user)
            .subscribe(
                data => {
                    //The token is stored in local storage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('username', user.username);
                    this.router.navigateByUrl('/');
                },
                error => console.log(error)
            );
        this.form.reset();
    }
    
    ngOnInit() {
        const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        this.form = new FormGroup({
            username: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15)
            ]),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(emailRegExp)
            ]),
            firstName: new FormControl(null,  [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15)
            ]),
            secondName: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15)
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15)
            ])
        });
    }   
}