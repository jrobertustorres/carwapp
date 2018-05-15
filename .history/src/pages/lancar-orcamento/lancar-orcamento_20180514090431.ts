import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

//ENTITYS
import { OrcamentoEntity } from './../../model/orcamento-entity';

//SEVICES
import { OrcamentoService } from '../../providers/orcamento-service';

//PAGES
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-lancar-orcamento',
  templateUrl: 'lancar-orcamento.html',
})
export class LancarOrcamentoPage {
  private loading = null;
  private orcamentoEntity: OrcamentoEntity;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private orcamentoService: OrcamentoService,
              private toastCtrl: ToastController,
              public navParams: NavParams) {
    this.orcamentoEntity = new OrcamentoEntity();
    this.orcamentoEntity = navParams.get('orcamentoEntity');
  }

  ngOnInit() {
    console.log(this.orcamentoEntity);
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

  submeterOrcamento() {
    // this.listIdVeiculo.push(this.idVeiculo);
    // this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();
    // this.servicoOrcamentoEntity.idServico = this.idServico;
    // this.servicoOrcamentoEntity.descricao = descricao;

    // this.orcamentoEntity.listIdVeiculo = this.listIdVeiculo;
    // this.orcamentoEntity.listIdFornecedor = this.listIdFornecedor;
    // this.orcamentoEntity.listServicoOrcamento = [];
    // this.orcamentoEntity.listServicoOrcamento.push(this.servicoOrcamentoEntity); // idservico e descricao

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

}
