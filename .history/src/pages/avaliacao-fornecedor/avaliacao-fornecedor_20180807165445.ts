import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';

//SERVICES
import { OrdemServicoService } from './../../providers/ordem-servico-service';

//ENTITYS
import { OrdemServicoEntity } from '../../model/orderm-servico-entity';

//PAGES
import { OrcamentosListPage } from '../orcamentos-list/orcamentos-list';

@IonicPage()
@Component({
  selector: 'page-avaliacao-fornecedor',
  templateUrl: 'avaliacao-fornecedor.html',
})
export class AvaliacaoFornecedorPage {
  public idOrdemServico: number;
  private loading = null;
  private ordemServicoEntity: OrdemServicoEntity;

  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController,
              private ordemServicoService: OrdemServicoService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public navParams: NavParams) {
    this.idOrdemServico = navParams.get('idOrdemServico');
    this.ordemServicoEntity = new OrdemServicoEntity();
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Obrigado por sua avaliação!',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  enviarAvaliacao(avaliacao) {
    try {
      if(avaliacao) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...',
          dismissOnPageChange: true
        });
        this.loading.present();

        this.ordemServicoEntity.idOrdemServico = this.idOrdemServico;
        this.ordemServicoEntity.avaliacao = avaliacao;

        this.ordemServicoService
        .avaliacaoFornecedor(this.ordemServicoEntity)
        .then((ordemServicoEntityResult: OrdemServicoEntity) => {
          this.loading.dismiss();
          this.presentToast();
          setTimeout(() => {
            this.navCtrl.setRoot(OrcamentosListPage);
          }, 3000);
        }, (err) => {
          this.loading.dismiss();
          this.alertCtrl.create({
            subTitle: err.message,
            buttons: ['OK']
          }).present();
        });
      } else {
        this.alertAvaliacao();
      }
    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

  alertAvaliacao() {
    const alert = this.alertCtrl.create({
      title: 'Avaliação!',
      subTitle: 'Antes de salvar é necesário selecionar alguma estrela!',
      buttons: ['OK']
    });
    alert.present();
  }

}
