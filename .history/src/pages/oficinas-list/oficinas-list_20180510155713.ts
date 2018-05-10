import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController, ToastController, Item, ItemSliding } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

//SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';
import { OrcamentoService } from '../../providers/orcamento-service';

//PAGES
import { FornecedorDetalhePage } from './../fornecedor-detalhe/fornecedor-detalhe';
import { MapPage } from '../map/map';
import { HomePage } from '../home/home';

//ENTITYS
import { FornecedorEntity } from '../../model/fornecedor-entity';
import { OrcamentoEntity } from './../../model/orcamento-entity';
import { ServicoOrcamentoEntity } from '../../model/servico-orcamento-entity';

@IonicPage()
@Component({
  selector: 'page-oficinas-list',
  templateUrl: 'oficinas-list.html',
})
export class OficinasListPage {
  private loading = null;
  private fornecedores: any;
  public idServico: any;
  public idVeiculo: any;
  public idCidade: number;
  public contador: number;

  activeItemSliding: ItemSliding = null;

  public listIdVeiculo: number[] = [];
  public listIdFornecedor: number[] = [];
  public listServicoOrcamento: any[] = [];
  private fornecedorEntity: FornecedorEntity;
  private orcamentoEntity: OrcamentoEntity;
  private servicoOrcamentoEntity: ServicoOrcamentoEntity;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private fornecedorService: FornecedorService,
              private orcamentoService: OrcamentoService,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              private geolocation: Geolocation,
              private diagnostic: Diagnostic,
              private locationAccuracy: LocationAccuracy,
              private toastCtrl: ToastController,
              public navParams: NavParams) {

    this.fornecedorEntity = new FornecedorEntity();
    this.orcamentoEntity = new OrcamentoEntity();
    this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();

    this.idServico = navParams.get('idServico');
    this.idCidade = navParams.get('idCidade');
    this.idVeiculo = navParams.get('idVeiculo');
  }

  ngOnInit() {
    this.contador = 0;
    this.findOficinasList();
  }

  ionViewDidLoad() {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'O orçamento foi lançado para todos os fornecedores!',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  findOficinasListREMOVER() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    console.log('dentro do find');

    this.fornecedorEntity = new FornecedorEntity();
    this.fornecedorEntity.idServico = this.idServico;

    if (!this.idCidade) {
      this.fornecedorEntity.latitude = JSON.parse(localStorage.getItem('latitude'));
      this.fornecedorEntity.longitude = JSON.parse(localStorage.getItem('longitude'));
      // this.getLocation();
      // this.buscaOficinas();

      console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');

      // let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
      // let errorCallback = (e) => console.error(e);
      
      // this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
      
      // // only android
      // this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);

      // this.diagnostic.isLocationEnabled()
      // .then((state) => {
      //   console.log('linha 110 oficinas-list');
      //   console.log(state);
      //   if (state == true) {
      //     this.getLocation();
      //   } else {
      //     this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      //       if(canRequest) {
      //         // the accuracy option will be ignored by iOS
      //         this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      //         .then(
      //           () => this.getLocation(),
      //           error => this.showLocationText()
      //         );
      //       }
          
      //     });


          
      //   }
      // }).catch(e => console.error(e));
      
    } else {
      this.fornecedorEntity.idCidade = this.idCidade;
      // this.buscaOficinas();
    }
  }

  // getLocation() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     console.log(resp);
  //     this.fornecedorEntity.latitude = resp.coords.latitude;
  //     this.fornecedorEntity.longitude = resp.coords.longitude;

  //     // if (!this.fornecedorEntity.latitude && !this.fornecedorEntity.longitude) {
  //     //   this.showLocationText();
  //     // }

  //     this.buscaOficinas();

  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  // }

  findOficinasList() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.fornecedorEntity = new FornecedorEntity();
    this.fornecedorEntity.idServico = this.idServico;

    if (!this.idCidade) {
      this.fornecedorEntity.latitude = JSON.parse(localStorage.getItem('latitude'));
      this.fornecedorEntity.longitude = JSON.parse(localStorage.getItem('longitude'));
    } else {
      this.fornecedorEntity.idCidade = this.idCidade;
    }

    this.fornecedorService
    .findFornecedorPorRaio(this.fornecedorEntity)
    .then((dados) => {
    this.fornecedores = dados;

    localStorage.setItem('fornecedoresMapa', JSON.stringify(this.fornecedores));
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

  fornecedoresChecked(fornecedor) {

    if (this.listIdFornecedor.indexOf(fornecedor) == -1) {
      this.listIdFornecedor.push(fornecedor);
      this.contador = this.contador +1;
    }else{
      this.listIdFornecedor.splice(this.listIdFornecedor.indexOf( fornecedor),1);
      this.contador = this.contador == 0 ? this.contador : this.contador-1;
    }
  }

  verificaRegistrosSelecionados() {
    if (this.listIdFornecedor.length == 0) {
      this.showAlert();
    } else {
      this.showObservacaoText();
    }

  }

  // showLocationText() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Localização',
  //     message: "Não foi possível obter a localização atual!",
  //     buttons: [
  //       {
  //         text: 'OK!',
  //         handler: data => {
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  showObservacaoText() {
    let prompt = this.alertCtrl.create({
      title: 'Observação',
      message: "Deseja informar algo ao mecânico?",
      inputs: [
        {
          name: 'descricao',
          placeholder: 'Observação'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'LANÇAR!',
          handler: data => {
            console.log(data);
            this.lancarOrcamento(data.descricao);

          }
        }
      ]
    });
    prompt.present();
  }

  lancarOrcamento(descricao) {
    this.listIdVeiculo.push(this.idVeiculo);
    this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();
    this.servicoOrcamentoEntity.idServico = this.idServico;
    this.servicoOrcamentoEntity.descricao = descricao;

    this.orcamentoEntity.listIdVeiculo = this.listIdVeiculo;
    this.orcamentoEntity.listIdFornecedor = this.listIdFornecedor;
    this.orcamentoEntity.listServicoOrcamento = [];
    this.orcamentoEntity.listServicoOrcamento.push(this.servicoOrcamentoEntity); // idservico e descricao

    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.orcamentoService
    .lancarOrcamentoServico(this.orcamentoEntity)
    .then((orcamentoEntityResult: OrcamentoEntity) => {
      this.loading.dismiss();
      this.presentToast();
      setTimeout(() => {
        this.navCtrl.setRoot(HomePage);
      }, 3000);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Lançar orçamento',
      subTitle: 'Por favor, selecione algum registro!',
      buttons: ['OK']
    });
    alert.present();
  }

  swipeSlide(itemSlide: ItemSliding, item: Item) {
    this.clickSlide(itemSlide, item);
  }

  clickSlide(itemSlide: ItemSliding, item: Item) {

    if(this.activeItemSliding!==null){
      this.closeOption();
    }
    this.activeItemSliding = itemSlide;
    let swipeAmount = 124; //set your required swipe amount
    itemSlide.startSliding(swipeAmount);
    itemSlide.moveSliding(swipeAmount);

    itemSlide.setElementClass('active-options-right', true);
    itemSlide.setElementClass('active-swipe-right', true);

    item.setElementStyle('transition', null);
    item.setElementStyle('transform', 'translate3d(-'+swipeAmount+'px, 0px, 0px)');

    }

    closeOption() {
   
      if(this.activeItemSliding) {
       this.activeItemSliding.close();
       this.activeItemSliding = null;
      }
    }

  // ESSE METODO NAO SERÁ USADO
  // applyHaversine(locations){
 
  //   let usersLocation = {
  //       lat: 40.713744,
  //       lng: -74.009056
  //   };

  //   locations.map((location) => {

  //       let placeLocation = {
  //           lat: location.latitude,
  //           lng: location.longitude
  //       };

  //       location.distance = this.getDistanceBetweenPoints(
  //           usersLocation,
  //           placeLocation,
  //           'miles'
  //       ).toFixed(2);
  //   });

  //   return locations;
  // }
 
  // getDistanceBetweenPoints(start, end, units){

  //   let earthRadius = {
  //       miles: 3958.8,
  //       km: 6371
  //   };

  //   let R = earthRadius[units || 'miles'];
  //   let lat1 = start.lat;
  //   let lon1 = start.lng;
  //   let lat2 = end.lat;
  //   let lon2 = end.lng;

  //   let dLat = this.toRad((lat2 - lat1));
  //   let dLon = this.toRad((lon2 - lon1));
  //   let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //   Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
  //   Math.sin(dLon / 2) *
  //   Math.sin(dLon / 2);
  //   let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   let d = R * c;

  //   return d;

  // }

  // toRad(x){
  //     return x * Math.PI / 180;
  // }


}
