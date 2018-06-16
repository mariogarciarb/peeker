
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';

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
    
    constructor(private router: Router, private authService: AuthService, private dataService: DataService) {}

    ngOnInit() {
        // if (!this.authService.isLoggedIn()) {            
        //     this.router.navigateByUrl('/auth');
        //     return;
        // }
        
        this.authService.isSessionExpired()
            .subscribe(
                (expired: boolean) => {
                    if (expired) {
                        this.authService.logout();
                        this.router.navigateByUrl('/auth');
                        return;
                    }

                    this.muteLocalVideo();

                    // If the chat was already initialized theres no need to do it again                    
                    this.dataService.isChatInitialized.subscribe((isInitialized) => this.initChat(isInitialized));
                },  (err) => {                    
                        this.authService.logout();
                        this.router.navigateByUrl('/auth');
                    }
        );
    }

    initChat(isAlreadyInitialized) {
        // If not initialized
        if (!isAlreadyInitialized) {

            // isInitialized = true
            console.log(isAlreadyInitialized);
            this.dataService.changeIsChatInitialized(true);
            console.log('ha petau');

            // Initializing client with callbacks
            initClient(
                this.toggleCallScreen,
                this.toggleReceivedCallScreen,   
                this.slashMicIcon,
                this.slashPauseIcon);
        } else {
            console.log('NO');
        }
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
        } else {
            cancelCall();
        }
        
        this.toggleCallScreen();
    }

    onMute(e) {
        toggleMute();
        this.slashMicIcon(isMicMuted);
    }

    onPause(e) {
        togglePause();
        this.slashPauseIcon(isVidPaused);
    }

    slashPauseIcon(isVidPaused) {
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

    slashMicIcon(isMicMuted) {
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
        this.toggleReceivedCallScreen('username');
        this.toggleCallScreen();
        pickUp();
    }

    onCallReject() {
        this.toggleReceivedCallScreen();
        rejectCall();
    }
}