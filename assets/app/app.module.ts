import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { ChatComponent } from "./chat/chat.component";
import { NavComponent } from "./nav/nav.component";
import { AsideComponent } from "./aside/aside.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        NavComponent,
        AsideComponent,
        FooterComponent, 
        MainComponent
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}