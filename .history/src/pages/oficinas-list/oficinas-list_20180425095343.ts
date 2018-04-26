import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

// import { GoogleMapsProvider } from '../../providers/google-maps';
// import { LocationsProvider } from '../../providers/locations';

//SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';

//PAGES
import { FornecedorDetalhePage } from './../fornecedor-detalhe/fornecedor-detalhe';
import { MapPage } from '../map/map';

//ENTITYS
import { FornecedorEntity } from '../../model/fornecedor-entity';

@IonicPage()
@Component({
  selector: 'page-oficinas-list',
  templateUrl: 'oficinas-list.html',
})
export class OficinasListPage {
  private loading = null;
  private fornecedores: any;
  public idServico: number;
  public idCidade: number;
  private fornecedorEntity: FornecedorEntity;
  // segment: string = "lista"; // default button

  // @ViewChild('map') mapElement: ElementRef;
  // @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private fornecedorService: FornecedorService,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              private geolocation: Geolocation,
              public navParams: NavParams) {
    this.fornecedorEntity = new FornecedorEntity();
    this.idServico = navParams.get('idServico');
    this.idCidade = navParams.get('idCidade');
  }

  ngOnInit() {
    // this.segment = "lista";
    this.findOficinasList();
  }

  ionViewDidLoad() {
  }

  selectedTabChanged($event): void {
    if ($event._value == "lista") {
      console.log('aaa');
      this.findOficinasList();
    } else {
      console.log('CHAMANDO O MAPA');
      // let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
 
      // this.findOficinasList();
    }
  }

  findOficinasList() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.fornecedorEntity = new FornecedorEntity();
    this.fornecedorEntity.idServico = this.idServico;
    this.fornecedorEntity.idCidade = this.idCidade;

    //LIGAR O GPS PARA PEGAR OS DADOS
    // LAT LONG DO USER
    // this.fornecedorEntity.latitude = -18.912548;
    // this.fornecedorEntity.longitude = -48.309087;

    if (!this.idCidade) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.fornecedorEntity.latitude = resp.coords.latitude;
        this.fornecedorEntity.longitude = resp.coords.longitude;

        this.buscaOficinas();

        console.log(this.fornecedorEntity);
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    } else {
      this.buscaOficinas();
    }
  }

  buscaOficinas() {
    this.fornecedorService
    .findFornecedorPorRaio(this.fornecedorEntity)
    .then((dados) => {
    this.fornecedores = dados;
    console.log(this.fornecedores);
    // localStorage.setItem('fornecedoresMapa', this.fornecedores);

    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  mostrarDetalhesFornecedor(idFornecedor) {
    this.navCtrl.push(FornecedorDetalhePage, {
      idFornecedor: idFornecedor
    })
  }

  showMap(){
    this.navCtrl.push(MapPage);
  }

  applyHaversine(locations){
 
    let usersLocation = {
        lat: -18.912697,
        lng: -48.311463
        // lat: 40.713744,
        // lng: -74.009056
    };

    locations.map((location) => {

        let placeLocation = {
            lat: location.latitude,
            lng: location.longitude
        };

        location.distance = this.getDistanceBetweenPoints(
            usersLocation,
            placeLocation,
            'miles'
        ).toFixed(2);
    });

    return locations;
  }
 
  getDistanceBetweenPoints(start, end, units){

    let earthRadius = {
        miles: 3958.8,
        km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x){
      return x * Math.PI / 180;
  }


}
