import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocationsProvider } from '../../providers/locations';
import { GoogleMapsProvider } from '../../providers/google-maps';
import { NavController, Platform, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
    private loading = null;
    private mapLoaded = null;
    private locationsLoaded = null;
 
    constructor(public navCtrl: NavController, 
                public maps: GoogleMapsProvider, 
                public platform: Platform,
                public loadingCtrl: LoadingController,
                public locations: LocationsProvider) {
 
    }

    ngOnInit() {
        
    }
 
    ionViewDidLoad(){
 
        this.platform.ready().then(() => {
            this.loading = this.loadingCtrl.create({
                content: 'Aguarde...'
              });
              this.loading.present();
 
            this.mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            // let locationsLoaded = this.locations.load(); // ORIGINAL

            this.locationsLoaded = JSON.parse(localStorage.getItem('fornecedoresMapa'));

            console.log(this.locationsLoaded);

            Promise.all([
                this.mapLoaded,
                this.locationsLoaded
            ]).then((result) => {
                console.log('dentro do result do mapa');

                let locations = result[1];

                for(let location of locations){
                    // this.maps.addMarker(40.713744, -74.009056);
                    this.maps.addMarker(location.latitude, location.longitude); // ORIGINAL
                    // this.maps.addMarker(-18.912697, -48.311463); // PERTO DE CASA
                }
                this.loading.dismiss();

            });
        });
 
    }
 
}