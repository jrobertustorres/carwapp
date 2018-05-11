import { Injectable } from '@angular/core';
import { ConnectivityProvider } from '../providers/connectivity';
import { Geolocation } from '@ionic-native/geolocation'; 
import { Storage } from '@ionic/storage';
 
declare var google;
 
@Injectable()
export class GoogleMapsProvider {
 
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
 
  constructor(public connectivityService: ConnectivityProvider,
              private _storage: Storage,
              private geolocation: Geolocation) {
 
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
          }
 
          document.body.appendChild(script); 
 
        }
      }
      else {
 
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
 
  initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
        // this.geolocation.getCurrentPosition().then((position) => { //ORIGINAL
        // UNCOMMENT FOR NORMAL USE
        // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //ORIGINAL
        let latLng = new google.maps.LatLng(JSON.parse(localStorage.getItem('latitude')), JSON.parse(localStorage.getItem('longitude'))); //ORIGINAL

        let mapOptions = {
          center: latLng,
          zoom: 15,
          disableDefaultUI : false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        this.centerMap(latLng);
        resolve(true);
 
      // });
 
    });
 
  }

  private centerMap(markerPos: any) {
    this.map.setZoom (14);
		this.map.setCenter(markerPos);

  }
 
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
 
  }
 
  addMarker(lat: number, lng: number): void {
 
    let latLng = new google.maps.LatLng(lat, lng);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
      // position: this.map.getCenter()
    });
 
    // this.markers.push(marker); 

    // let content = "<h4>Information!</h4>";
    // this.addInfoWindow(marker, content);


    let content = JSON.parse(localStorage.getItem('fornecedoresMapa'));
    console.log(content);
    let conteudo = null;

    for (let i = 0; i < content.length; i++) {
      conteudo = content[i].fantasia;
      console.log(conteudo);
    }

    // for(let info of content){
    //   conteudo = info.fantasia;
    //   console.log(conteudo);
    // }

    this.addInfoWindow(marker, conteudo);
    // this.addInfoWindow(marker, content);
 
  }

  addInfoWindow(marker, content){
    // console.log(marker);
    console.log(content);

    // for(let info of content){
    //   console.log(info.idFornecedor);
    //   console.log(info.fantasia);
    // }

    // for(let info of content){
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    // }
  }
 
}