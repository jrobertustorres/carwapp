import { Injectable } from '@angular/core';
import { ConnectivityProvider } from '../providers/connectivity';
 
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
 
  constructor(public connectivityService: ConnectivityProvider) {
 
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
      console.log('dentro do resolve');

      // console.log(google);
      // console.log(typeof google.maps);
 
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
        console.log('dentro do ELSE');
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
          console.log('dentro do IF');
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
          // this.initMap().then(() => {
          //   resolve(true);
          // });

          // this.enableMap();
          // this.initMap(); // comentei as duas linhas pois só estava carregando os marks na primeira vez que entrava no mapa
          // this.enableMap(); // a partir da segunda vez, o google entendia que o mapa já estava carregado e não montava novamente
        }
        else {
          this.disableMap();
          console.log('dentro do ELSE DISABLEMAP');
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
        let latLng = new google.maps.LatLng(JSON.parse(localStorage.getItem('latitude')), JSON.parse(localStorage.getItem('longitude'))); //ORIGINAL

        let mapOptions = {
          center: latLng,
          zoom: 14,
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
 
    let iconVeiculo = 'assets/imgs/oficina.png';
    let latLng = new google.maps.LatLng(lat, lng);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: iconVeiculo,
      // position: this.centerMap(latLng)
      position: latLng
      // position: this.map.getCenter()
    });
 
    // this.markers.push(marker); 

    // let content = "<h4>Information!</h4>";
    // this.addInfoWindow(marker, content);

    let content = JSON.parse(localStorage.getItem('fornecedoresMapa'));
    let conteudo = null;

    for (let i = 0; i < content.length; i++) {
      if(content[i].latitude == lat && content[i].longitude == lng) {
        conteudo = content[i].fantasia;
        this.addInfoWindow(marker, conteudo);
      }
    }

  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
 
}