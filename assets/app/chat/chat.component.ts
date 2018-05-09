import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
    ngOnInit() {
        initClient();
        this.muteLocalVideo();
    }

    muteLocalVideo() {                
        var element = document.getElementById('localVideo');
        element.muted = "muted";
    }
}