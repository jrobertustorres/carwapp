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

            // let locationsLoaded = localStorage.getItem('fornecedoresMapa');
            // locationsLoaded = parseInt(locationsLoaded);
            // locationsLoaded = JSON.parse(locationsLoaded);

            let locationsLoaded = localStorage.getItem("fornecedoresMapa");
            locationsLoaded = JSON.parse(locationsLoaded);

            console.log(localStorage.getItem('fornecedorLatitude'));
            console.log(localStorage.getItem('fornecedorLongitude'));
            console.log(locationsLoaded);

            
            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {
 
                let locations = result[1];
                
                for(let location of locations){
                  // console.log(location);
                //   console.log(parseInt(location.longitude));
                    // this.maps.addMarker(-18.912697, -48.311463);
                    // this.maps.addMarker(location.latitude, location.longitude); // ORIGINAL
                    // this.maps.addMarker(parseInt(localStorage.getItem('fornecedorLatitude')), parseInt(localStorage.getItem('fornecedorLongitude')));
                }
 
            });
 
        });
 
    }
 
}