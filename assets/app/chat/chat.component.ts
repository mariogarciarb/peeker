
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
            this.toggleCallScreen,
            this.toggleReceivedCallScreen);

        // $('#remoteVideo').css('height', ($(window).height() - $('nav').height())+ 'px');
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
        if (isStarted) {            
            hangup();
            this.toggleCallScreen();
        } else {
            cancelCall();
            this.toggleCallScreen();
        }
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
        var screen = document.querySelector('.main-content .on-call-screen');
        screen.classList.toggle('on-screen');
        screen.classList.toggle('d-none');

        document.querySelectorAll('.on-call-btn')
            .forEach(element => {
                element.classList.toggle('visible');
            });
    }

    toggleReceivedCallScreen() {    
        var screen = document.querySelector('.main-content .received-call-screen');
        screen.classList.toggle('on-screen');
        screen.classList.toggle('d-none');

        document.querySelectorAll('.received-call-btn')
            .forEach(element => {
                element.classList.toggle('visible');
            });
    }

    onPickUp() {
        this.toggleReceivedCallScreen();
        this.toggleCallScreen();
        pickUp();
    }

    onCallReject() {
        this.toggleReceivedCallScreen();
        rejectCall();
    }

    isAuthenticated() {
        return localStorage.getItem('token');
    }
}