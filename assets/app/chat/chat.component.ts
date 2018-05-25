import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

    constructor(private router: Router) {}

    ngOnInit() {        
        if (!this.isAuthenticated()) {            
            this.router.navigateByUrl('/auth');
            return;
        }
        
        initClient();
        this.muteLocalVideo();
    }

    muteLocalVideo() {                
        var element = document.getElementById('localVideo');
        element.muted = "muted";
    }

    isAuthenticated() {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token');
    }
}