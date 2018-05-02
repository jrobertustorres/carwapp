import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

// import { GoogleMapsProvider } from '../../providers/google-maps';
// import { LocationsProvider } from '../../providers/locations';

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

  // public fornecedoresSelecionados = [];
  // private fornecedoresSelecionados: Array<Object> = [];
  // private fornecedoresSelecionados: Array<Object> = [];
  public listIdVeiculo: number[] = [];
  public listIdFornecedor: number[] = [];
  public listServicoOrcamento: any[] = [];
  // public listServicoOrcamento: ServicoOrcamentoEntity[] = [];

  // public listIdVeiculo = [];
  // public fornecedoresSelecionados: number[] = [];
  // public listIdVeiculo: ServicoOrcamentoEntity[] = [];
  private fornecedorEntity: FornecedorEntity;
  private orcamentoEntity: OrcamentoEntity;
  private servicoOrcamentoEntity: ServicoOrcamentoEntity;

  // @ViewChild('map') mapElement: ElementRef;
  // @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private fornecedorService: FornecedorService,
              private orcamentoService: OrcamentoService,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              private geolocation: Geolocation,
              private toastCtrl: ToastController,
              private _storage: Storage,
              public navParams: NavParams) {

    this.fornecedorEntity = new FornecedorEntity();
    this.orcamentoEntity = new OrcamentoEntity();
    this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();

    this.idCidade = navParams.get('idCidade');

    this.idServico = navParams.get('idServico');
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

  // selectedTabChanged($event): void {
  //   if ($event._value == "lista") {
  //     console.log('aaa');
  //     this.findOficinasList();
  //   } else {
  //     console.log('CHAMANDO O MAPA');
      // let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
 
      // this.findOficinasList();
  //   }
  // }

  findOficinasList() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.fornecedorEntity = new FornecedorEntity();
    this.fornecedorEntity.idServico = this.idServico;
    this.fornecedorEntity.idCidade = this.idCidade;

    if (!this.idCidade) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.fornecedorEntity.latitude = resp.coords.latitude;
        this.fornecedorEntity.longitude = resp.coords.longitude;

        if (!this.fornecedorEntity.latitude && !this.fornecedorEntity.longitude) {
          this.showLocationText();
        }

        // COLOCAR UMA VALIDAÇÃO AQUI POIS PODE OCORRER DE NÃO SER POSSÍVEL PEGAR OS DADOS DE LAT E LONG

        this.buscaOficinas();

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
    this._storage.set('fornecedoresMapa', this.fornecedores);
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

    // this.fornecedoresSelecionados = [
    //   {
    //     "idFornecedor": "1"
    //   },
    //   {
    //     "idFornecedor": "2"
    //   }
    //   ];

    // this.fornecedoresSelecionados['idFornecedor'] = this.fornecedoresSelecionados;

    if (this.listIdFornecedor.indexOf(fornecedor) == -1) {
      this.listIdFornecedor.push(fornecedor);
      this.contador = this.contador +1;
    }else{
      this.listIdFornecedor.splice(this.listIdFornecedor.indexOf( fornecedor),1);
      this.contador = this.contador == 0 ? this.contador : this.contador-1;
    }
    // if (this.fornecedoresSelecionados.indexOf(fornecedor) == -1) {
    //   this.fornecedoresSelecionados.push({'idFornecedor': fornecedor});
    //   this.contador = this.contador +1;
    // }else{
    //   this.fornecedoresSelecionados.splice(this.fornecedoresSelecionados.indexOf({'idFornecedor': fornecedor}),1);
    //   this.contador = this.contador == 0 ? this.contador : this.contador-1;
    // }

    console.log(this.listIdFornecedor);
  }

  verificaRegistrosSelecionados() {
    // if (this.fornecedoresSelecionados.length == 0) {
    if (this.listIdFornecedor.length == 0) {
      this.showAlert();
    } else {
      this.showObservacaoText();
    }

  }

  showLocationText() {
    let prompt = this.alertCtrl.create({
      title: 'Localização',
      message: "Não foi possível obter a localização atual!",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'OK!',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();
  }

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
  
  console.log(this.idVeiculo);
  console.log(this.listIdVeiculo);

  // this.listIdVeiculo = this.idVeiculo;
  this.listIdVeiculo.push(this.idVeiculo);
  // this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();
  // this.servicoOrcamentoEntity.idServico = this.idServico;
  // this.servicoOrcamentoEntity.descricao = descricao;

  // this.servicoOrcamentoEntity = [
  //   {
  //     "idServico": this.idServico,
  //     "descricao": descricao
  //   }
  //   ]

  this.listServicoOrcamento = [
    {'idServico': this.idServico},
    {'descricao': descricao}
    ];

  this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();
    console.log(this.listServicoOrcamento);
    // listServicoOrcamento:[{"idServico":"1","descricao":"teste1"}]


  
  // this.listServicoOrcamento['idServico'] = this.idServico;
  // this.listServicoOrcamento['descricao'] = descricao;

  // let listServicoOrcamento = null;

  // this.servicoOrcamentoEntity.idServico = this.idServico;
  // this.servicoOrcamentoEntity.descricao = descricao;

  console.log(this.servicoOrcamentoEntity);

    // this.servicoOrcamentoEntity.push(this.idServico);
    // this.listServicoOrcamento.push(descricao);
    this.orcamentoEntity['listIdVeiculo'] = this.listIdVeiculo;
    this.orcamentoEntity['listIdFornecedor'] = this.listIdFornecedor;
    this.orcamentoEntity.listServicoOrcamento = this.servicoOrcamentoEntity; // idservico e descricao

    console.log(this.orcamentoEntity);

      // this.orcamentoService
      // .lancarOrcamentoServico(this.orcamentoEntity)
      // .then((orcamentoEntityResult: OrcamentoEntity) => {
      //   this.loading.dismiss();
      //   this.presentToast();
      //   setTimeout(() => {
      //     this.navCtrl.setRoot(HomePage);
      //   }, 3000);
      // }, (err) => {
      //   this.loading.dismiss();
      //   this.alertCtrl.create({
      //     subTitle: err.message,
      //     buttons: ['OK']
      //   }).present();
      // });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Lançar orçamento',
      subTitle: 'Por favor, selecione algum registro!',
      buttons: ['OK']
    });
    alert.present();
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