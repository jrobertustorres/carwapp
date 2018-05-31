import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

//SERVICES
import { OrdemServicoService } from './../../providers/ordem-servico-service';

//ENTITYS
import { OrdemServicoEntity } from '../../model/orderm-servico-entity';

@IonicPage()
@Component({
  selector: 'page-avaliacao-fornecedor',
  templateUrl: 'avaliacao-fornecedor.html',
})
export class AvaliacaoFornecedorPage {
  public idOrdemServico: number;
  private ordemServicoEntity: OrdemServicoEntity;

  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController,
              private ordemServicoService: OrdemServicoService,
              public navParams: NavParams) {
    this.idOrdemServico = navParams.get('idOrdemServico');
    this.ordemServicoEntity = new OrdemServicoEntity();
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  // enviarAvaliacao(rate) {
  //   console.log(rate);
  //   console.log('enviar avaliação');
  // }

  enviarAvaliacao(rate) {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...',
        // dismissOnPageChange: true
      });
      this.loading.present();,

    this.ordemServicoService
    .avaliacaoFornecedor(this.ordemServicoEntity)
    .then((ordemServicoEntityResult: OrdemServicoEntity) => {
      this.loading.dismiss();
      this.toastMessage = 'Seu veículo foi atualizado!';
      this.presentToast();
      setTimeout(() => {
        this.navCtrl.setRoot(VeiculosListPage);
      }, 3000);
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

}
