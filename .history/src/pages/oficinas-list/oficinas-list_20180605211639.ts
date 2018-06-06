import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Constants } from '../../app/constants';

//SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';
import { OrcamentoService } from '../../providers/orcamento-service';

//PAGES
import { FornecedorDetalhePage } from './../fornecedor-detalhe/fornecedor-detalhe';
import { MapPage } from '../map/map';
// import { HomePage } from '../home/home';
import { LancarOrcamentoPage } from '../lancar-orcamento/lancar-orcamento';

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

  loadMore(infiniteScroll) {

    setTimeout(() => {

      this.findOficinasList();
      infiniteScroll.complete();
    }, 500);
  }

  findOficinasList() {
    this.fornecedorEntity.limitDados = this.fornecedorEntity.limitDados ? this.fornecedores.length : null;

    if(this.fornecedorEntity.limitDados == null) {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();
    }

    // this.fornecedorEntity = new FornecedorEntity();
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
    this.fornecedorEntity.limitDados = this.fornecedores.length;

    console.log(this.fornecedores);

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
    if (localStorage.getItem(Constants.POSSUI_VEICULO) == 'true') {
      if (this.listIdFornecedor.length == 0) {
        this.showAlert();
      } else {
        this.listIdVeiculo.push(this.idVeiculo);
        this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();
        this.servicoOrcamentoEntity.idServico = this.idServico;

        this.orcamentoEntity.listIdVeiculo = this.listIdVeiculo;
        this.orcamentoEntity.listIdFornecedor = this.listIdFornecedor;
        this.orcamentoEntity.listServicoOrcamento = [];
        this.orcamentoEntity.listServicoOrcamento.push(this.servicoOrcamentoEntity); // idservico e descricao

        this.navCtrl.push(LancarOrcamentoPage, {
          orcamentoEntity: this.orcamentoEntity}
        );
      }
    } else {
      this.showVeiculoAlert();
    }

  }

  showHorárioAtendimentoAlert() {
    let prompt = this.alertCtrl.create({
      title: 'Horário atendimento',
      subTitle: "Não é possível lançar o orçamento, pois o fornecedor não está aberto no momento!",
      buttons: [
        {
          text: 'OK',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();
  }

  showVeiculoAlert() {
    let prompt = this.alertCtrl.create({
      title: 'Selecionar veículo',
      subTitle: "Para lançar orçamentos é necessário ter um veículo cadastrado!",
      buttons: [
        {
          text: 'OK',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Falha ao lançar!',
      subTitle: 'Por favor, selecione algum fornecedor!',
      buttons: ['OK']
    });
    alert.present();
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

  // showObservacaoText() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Observação',
  //     message: "Deseja informar algo ao mecânico?",
  //     inputs: [
  //       {
  //         name: 'descricao',
  //         placeholder: 'Observação'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'LANÇAR!',
  //         handler: data => {
  //           console.log(data);
  //           this.lancarOrcamento(data.descricao);

  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // lancarOrcamento(descricao) {
  //   this.listIdVeiculo.push(this.idVeiculo);
  //   this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();
  //   this.servicoOrcamentoEntity.idServico = this.idServico;
  //   this.servicoOrcamentoEntity.descricao = descricao;

  //   this.orcamentoEntity.listIdVeiculo = this.listIdVeiculo;
  //   this.orcamentoEntity.listIdFornecedor = this.listIdFornecedor;
  //   this.orcamentoEntity.listServicoOrcamento = [];
  //   this.orcamentoEntity.listServicoOrcamento.push(this.servicoOrcamentoEntity); // idservico e descricao

  //   this.loading = this.loadingCtrl.create({
  //     content: 'Aguarde...'
  //   });
  //   this.loading.present();

  //   this.orcamentoService
  //   .lancarOrcamentoServico(this.orcamentoEntity)
  //   .then((orcamentoEntityResult: OrcamentoEntity) => {
  //     this.loading.dismiss();
  //     this.presentToast();
  //     setTimeout(() => {
  //       this.navCtrl.setRoot(HomePage);
  //     }, 3000);
  //   }, (err) => {
  //     this.loading.dismiss();
  //     this.alertCtrl.create({
  //       subTitle: err.message,
  //       buttons: ['OK']
  //     }).present();
  //   });
  // }

  // swipeSlide(itemSlide: ItemSliding, item: Item) {
  //   this.clickSlide(itemSlide, item);
  // }

  // clickSlide(itemSlide: ItemSliding, item: Item) {

  //   if(this.activeItemSliding!==null){
  //     this.closeOption();
  //   }
  //   this.activeItemSliding = itemSlide;
  //   let swipeAmount = 124; //set your required swipe amount
  //   itemSlide.startSliding(swipeAmount);
  //   itemSlide.moveSliding(swipeAmount);

  //   itemSlide.setElementClass('active-options-right', true);
  //   itemSlide.setElementClass('active-swipe-right', true);

  //   item.setElementStyle('transition', null);
  //   item.setElementStyle('transform', 'translate3d(-'+swipeAmount+'px, 0px, 0px)');

  //   }

    // closeOption() {
   
    //   if(this.activeItemSliding) {
    //    this.activeItemSliding.close();
    //    this.activeItemSliding = null;
    //   }
    // }

}
