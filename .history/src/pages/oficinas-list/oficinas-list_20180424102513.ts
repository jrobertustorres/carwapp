import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';

import { GoogleMapsProvider } from '../../providers/google-maps';
import { LocationsProvider } from '../../providers/locations';

//SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';

//PAGES
import { FornecedorDetalhePage } from './../fornecedor-detalhe/fornecedor-detalhe';

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
  segment: string = "lista"; // default button

  // @ViewChild('map') mapElement: ElementRef;
  @ViewChild('oficinas-list') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private fornecedorService: FornecedorService,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public maps: GoogleMapsProvider, 
              public locations: LocationsProvider,
              public navParams: NavParams) {
    this.fornecedorEntity = new FornecedorEntity();
    this.idServico = navParams.get('idServico');
    this.idCidade = navParams.get('idCidade');
  }

  ngOnInit() {
    this.segment = "lista";
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
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
 
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
    this.fornecedorEntity.latitude = -18.9157878;
    this.fornecedorEntity.longitude = -48.2893467;

    this.fornecedorService
    .findFornecedorPorRaio(this.fornecedorEntity)
    .then((dados) => {
    this.fornecedores = dados;

    console.log(this.fornecedores);

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
}
