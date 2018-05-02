import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';

//ENTITYS
import { CotacaoEntity } from '../../model/cotacao-entity';
import { DetalheCotacaoEntity } from './../../model/detalhe-cotacao-entity';

//SERVICES
import { OrcamentoService } from '../../providers/orcamento-service';

//PAGES
import { HomePage } from '../home/home';
import { AvaliacaoFornecedorPage } from './../avaliacao-fornecedor/avaliacao-fornecedor';
import { ModalImagemFornecedorPage } from '../modal-imagem-fornecedor/modal-imagem-fornecedor';

@IonicPage()
@Component({
  selector: 'page-detalhe-cotacao',
  templateUrl: 'detalhe-cotacao.html',
})
export class DetalheCotacaoPage {
  private cotacaoEntity: CotacaoEntity;
  private detalheCotacaoEntity: DetalheCotacaoEntity;
  public idCotacao: number;
  public idFornecedor: number;
  private loading = null;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private orcamentoService: OrcamentoService,
              private toastCtrl: ToastController,
              public navParams: NavParams) {
    this.cotacaoEntity = new CotacaoEntity();
    this.detalheCotacaoEntity = new DetalheCotacaoEntity();
    this.idCotacao = navParams.get('idCotacao');
  }

  ngOnInit() {
    this.detalheCotacao();
  }

  ionViewDidLoad() {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Orçamento escolhido',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  detalheCotacao() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.detalheCotacaoEntity = new DetalheCotacaoEntity();
      this.detalheCotacaoEntity.idCotacao = this.idCotacao;

      this.orcamentoService.detalhaCotacao(this.detalheCotacaoEntity)
      .then((detalheCotacaoEntityResult: DetalheCotacaoEntity) => {
        this.detalheCotacaoEntity = detalheCotacaoEntityResult;
        this.idFornecedor = this.detalheCotacaoEntity.idFornecedor;
        console.log(this.detalheCotacaoEntity.idFornecedor);
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });

    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

  escolherCotacao() {
    // this.detalheCotacaoEntity = new DetalheCotacaoEntity();
    this.detalheCotacaoEntity.idCotacao = this.idCotacao;

    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.orcamentoService.escolherCotacao(this.detalheCotacaoEntity)
      .then((detalheCotacaoEntityResult: DetalheCotacaoEntity) => {
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

  modalAvaliacao() {
    let modal = this.modalCtrl.create(AvaliacaoFornecedorPage);
    modal.present();
  }

  modalImagensFornecedor(fab: FabContainer) {
    fab.close();
    let modal = this.modalCtrl.create(ModalImagemFornecedorPage, {idFornecedor: this.idFornecedor});
    modal.present();
  }

}
