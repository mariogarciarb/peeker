import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { ChatComponent } from "./chat/chat.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/chat', pathMatch: 'full' },
    { path: 'chat', component: ChatComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES},
    
    // Route for handling invalid URLs
    { path: '**', redirectTo: '/chat'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);