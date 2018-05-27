import { Component, OnInit, Output, Input } from '@angular/core';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit{
    URL: string = "";

    constructor(private router: Router, private data: DataService) {}

    ngOnInit() {
        this.data.URL.subscribe(currentURL => this.URL = currentURL);
    }

    onClick(e) {
        var newUrl = prompt('Please, enter the new URL', this.URL);
        if (!newUrl) {
            return;
        }
        
        this.data.changeURL(newUrl);
    }
}