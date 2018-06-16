import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
//In this file we'll store our global variables which are shared between components.
//We create a BehaviorSubject to ensure that the value of the variable is the last established.

private urlSource = new BehaviorSubject<string>("http://192.168.0.11:3000");
private isChatInitializedSource = new BehaviorSubject<boolean>(false);

public URL               = this.urlSource.asObservable();
public isChatInitialized = this.isChatInitializedSource.asObservable();
  constructor() { }

  changeURL(url: string) {
    this.urlSource.next(url);
  }

  changeIsChatInitialized(newIsChatInitialized: boolean) {
    this.isChatInitializedSource.next(newIsChatInitialized);
  }
}