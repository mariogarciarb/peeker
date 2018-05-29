import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { ChatComponent } from "./chat/chat.component";
import { NavComponent } from "./nav/nav.component";
import { AsideComponent } from "./aside/aside.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";
import { ContactsComponent } from './contacts/contacts.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { HomeComponent } from './home/home.component';

import { routing } from "./app.routing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from './auth/auth.service';
import { ContactService } from './contacts/contact.service';
import { ContactsListComponent } from './contacts/contacts-list.component';
import { ResultsListComponent } from './contacts/results-list.component';
import { DataService } from './data.service';
import { AboutComponent } from './about/about.component';
import { UserMenuComponent } from './auth/user-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactsComponent,
        ContactsListComponent,
        ResultsListComponent,
        ChatComponent,
        UserMenuComponent,
        NavComponent,
        AsideComponent,
        FooterComponent, 
        MainComponent,
        AuthenticationComponent,
        HomeComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        ReactiveFormsModule],

        //Whatever I provide here, is available in the whole app (all components also)
        providers: [
            AuthService,
            ContactService,
            DataService
        ],
    bootstrap: [AppComponent]
})
export class AppModule {

}