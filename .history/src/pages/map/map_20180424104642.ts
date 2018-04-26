import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsProvider } from '../../providers/google-maps';
import { LocationsProvider } from '../../providers/locations';
import { NavController, Platform } from 'ionic-angular';
 
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public locations: Locations) {
 
  }
 
  ionViewDidLoad(){
 
    this.platform.ready().then(() => {
 
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
 
    });
 
  }
 
}