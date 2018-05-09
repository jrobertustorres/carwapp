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
            // let locationsLoaded = this.locations.load(); // ORIGINAL

            let locationsLoaded = JSON.parse(localStorage.getItem('fornecedoresMapa'));

            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {

                let locations = result[1];

                for(let location of locations){
                    // this.maps.addMarker(40.713744, -74.009056);
                    this.maps.addMarker(location.latitude, location.longitude); // ORIGINAL
                    // this.maps.addMarker(-18.912697, -48.311463); // PERTO DE CASA
                }

            });
        });
 
    }
 
}