
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// declare module 'socket.io-client' {
//     var e: any;
//     export = e;
//     }
    
//     import '../../../public/js/libs/adapter.js';
//     import '../../../public/js/libs/main.js';

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
        
        this.muteLocalVideo();

        //Initializing client with callbacks
        initClient(
            this.onRemoteHangup, 
            this.toggleCallScreen,
            this.toggleReceivedCallScreen);
    }

    muteLocalVideo() {                
        var element = document.getElementById('localVideo');
        element.muted = "muted";
    }

    onCall(username) {
        this.toggleCallScreen();
        call(username);
    }

    onHangUp(e) {
        hangup();
        this.toggleCallScreen();
    }

    onRemoteHangup() {
        onToggleCallScreenCallback();
    }

    onMute(e) {
        toggleMute();
        var muteIcon = document.querySelector('.mute-btn i');
        e.target.classList.toggle('active-btn');
        muteIcon.classList.toggle('fa-microphone');
        muteIcon.classList.toggle('fa-microphone-slash');
    }

    onPause(e) {
        togglePause();
        var muteIcon = document.querySelector('.pause-btn i');
        e.target.classList.toggle('active-btn');
        muteIcon.classList.toggle('fa-video');
        muteIcon.classList.toggle('fa-video-slash');
    }

    toggleCallScreen() {
        document.querySelector('.main-content .content').classList.toggle('on-call');
        document.querySelectorAll('.on-call-btn')
            .forEach(element => {
                element.classList.toggle('visible');
            });
    }

    toggleReceivedCallScreen() {                                                //on-fullscreen
        // document.querySelector('.received-call-screen').classList.toggle('on-screen');
        // document.querySelectorAll('.received-call-btn')
        //     .forEach(element => {
        //         element.classList.toggle('visible');
        //     });
        rejectCall(callerId);
    }

    onPickUp() {
        // this.toggleReceivedCallScreen();
        this.toggleCallScreen();
        pickUp();
    }

    onCallReject() {
        this.toggleReceivedCallScreen();
    }

    onCancelCall() {
        cancelCall();
        this.toggleCallScreen();
    }

    isAuthenticated() {
        return localStorage.getItem('token');
    }
}