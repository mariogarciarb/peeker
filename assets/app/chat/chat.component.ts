
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
        this.toggleMicIcon(isMicMuted) ;
    }

    onPause(e) {
        togglePause();
        this.togglePauseIcon(isVidPaused);
    }

    togglePauseIcon(isVidPaused) {
        var btnClass        = 'pause-btn',
            activeClass     = 'active-btn',
            videoSlashClass = 'fa-video-slash',
            videoClass      = 'fa-video',
            muteBtn         = document.querySelector('.' + btnClass),
            muteIcon        = document.querySelector('.' + btnClass + ' i');
            
        if (isVidPaused) { //If paused, remove pause icon and active class
            muteBtn.classList.add(activeClass);
            muteIcon.classList.replace(videoClass, videoSlashClass);
        } else { // If not, add pause icon and active class
            muteBtn.classList.remove(activeClass);
            muteIcon.classList.replace(videoSlashClass, videoClass);
        }
    }

    toggleMicIcon(isMicMuted) {
        var btnClass        = 'mute-btn',
            activeClass     = 'active-btn',
            micSlashClass = 'fa-microphone-slash',
            micClass      = 'fa-microphone',
            muteBtn         = document.querySelector('.' + btnClass),
            muteIcon        = document.querySelector('.' + btnClass + ' i');
            
        if (isMicMuted) { //If paused, remove pause icon and active class
            muteBtn.classList.add(activeClass);
            muteIcon.classList.replace(micClass, micSlashClass);
        } else { // If not, add pause icon and active class
            muteBtn.classList.remove(activeClass);
            muteIcon.classList.replace(micSlashClass, micClass);
        }
    }

    toggleCallScreen() {
        var screen, contactsList;

        screen = document.querySelector('.main-content .on-call-screen');
        screen.classList.toggle('on-screen');
        screen.classList.toggle('d-none');

        contactsList = document.querySelector('.main-content .contacts-list');
        contactsList.classList.toggle('d-none');
        contactsList.classList.toggle('d-md-block');

        document.querySelectorAll('.on-call-btn')
            .forEach(element => {
                element.classList.toggle('visible');
            });
    }

    toggleReceivedCallScreen(callerUsername) {    
        var screen = document.querySelector('.main-content .received-call-screen');
        screen.classList.toggle('on-screen');
        screen.classList.toggle('d-none');
        //username
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