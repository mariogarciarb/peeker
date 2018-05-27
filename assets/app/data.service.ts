import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
//In this file we'll store our global variables which are shared between components.
//We create a BehaviorSubject to ensure that the value of the variable is the last established.

private urlSource = new BehaviorSubject<string>("http://192.168.0.13:3000");
URL = this.urlSource.asObservable();
  constructor() { }

  changeURL(url: string) {
    this.urlSource.next(url);
  }
}