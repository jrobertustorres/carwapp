import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

 
declare var Connection;
 
@Injectable()
export class ConnectivityProvider {
 
  onDevice: boolean;
 
  constructor(public platform: Platform,
              private network: Network){
    this.onDevice = this.platform.is('cordova');
  }
 
  isOnline(): boolean {
    // if(this.onDevice && Network.connection){
    if(this.onDevice && this.network.type != 'none'){
      return Network.connection !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && Network.connection){
      return Network.connection === Connection.NONE;
    } else {
      return !navigator.onLine;  
    }
  }
 
}