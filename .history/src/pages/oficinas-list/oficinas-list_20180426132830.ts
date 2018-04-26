import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
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
  public idServico: number;
  public idCidade: number;
  public idVeiculo: number;
  public fornecedoresSelecionados: number[] = [];
  public listServicoOrcamento: ServicoOrcamentoEntity[] = [];
  private fornecedorEntity: FornecedorEntity;
  private orcamentoEntity: OrcamentoEntity;
  private servicoOrcamentoEntity: ServicoOrcamentoEntity;
  // segment: string = "lista"; // default button

  // @ViewChild('map') mapElement: ElementRef;
  // @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private fornecedorService: FornecedorService,
              private orcamentoService: OrcamentoService,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              private geolocation: Geolocation,
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
    // this.segment = "lista";
    this.findOficinasList();
  }

  ionViewDidLoad() {
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
    let contador = 0;
    if (this.fornecedoresSelecionados.indexOf(fornecedor) == -1) {
      this.fornecedoresSelecionados.push(fornecedor);
      contador = contador++;
    }else{
      this.fornecedoresSelecionados.splice(this.fornecedoresSelecionados.indexOf(fornecedor),1);
      contador = contador--;
    }

    console.log(this.fornecedoresSelecionados);
    console.log(contador);
    
  }

  verificaRegistrosSelecionados() {
    console.log(this.fornecedoresSelecionados.length);
    if (this.fornecedoresSelecionados.length == 0) {
      this.showAlert();
    } else {
      console.log('enviar orçamento');
      this.showObservacaoText();
    }

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
            console.log('Cancel clicked');
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
    // this.orcamentoEntity.idVeiculo = this.idVeiculo;

    // this.orcamentoEntity.idServico = this.idServico;
    // this.orcamentoEntity.descricao = descricao;
    // this.fornecedoresSelecionados.push(fornecedor);
    // this.listServicoOrcamento.push(this.idServico);
    console.log(descricao);
    this.listServicoOrcamento.push(descricao);
    // this.listServicoOrcamento.push(this.fornecedoresSelecionados);
    // this.orcamentoEntity.listServicoOrcamento = this.listServicoOrcamento; // idservico e descricao
    this.orcamentoEntity.listIdFornecedor = this.fornecedoresSelecionados;

    console.log(this.orcamentoEntity);

      // this.orcamentoService
      // .lancarOrcamentoServico(this.orcamentoEntity)
      // .then((orcamentoEntityResult: OrcamentoEntity) => {
      //   this.loading.dismiss();
      //   this.toastMessage = 'O orçamento foi lançado para todos os fornecedores!';
      //   this.presentToast();
      //   setTimeout(() => {
      //     this.navCtrl.setRoot(VeiculosListPage);
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
