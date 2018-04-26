import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocationsProvider } from '../../providers/locations';
import { GoogleMapsProvider } from '../../providers/google-maps';
import { NavController, Platform } from 'ionic-angular';
 
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    constructor(public navCtrl: NavController, 
                public maps: GoogleMapsProvider, 
                public platform: Platform, 
                public locations: LocationsProvider) {
 
    }
 
    ionViewDidLoad(){
 
        this.platform.ready().then(() => {
 
            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            let locationsLoaded = this.locations.load();
            // let locationsLoaded = localStorage.getItem('fornecedoresMapa');
            // locationsLoaded = JSON.parse(locationsLoaded);

            // console.log(localStorage.getItem('fornecedoresMapa'));
            // console.log(locationsLoaded);

            
            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {
 
                let locations = result[1];
                
                for(let location of locations){
                  // console.log(location.latitude);
                    // this.maps.addMarker(location.latitude, location.longitude);
                    this.maps.addMarker(-18.9157878, -48.2893467);
                }
 
            });
 
        });
 
    }
 
}