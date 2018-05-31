import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-avaliacao-fornecedor',
  templateUrl: 'avaliacao-fornecedor.html',
})
export class AvaliacaoFornecedorPage {
  public idOrdemServico: number;

  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.idOrdemServico = navParams.get('idOrdemServico');
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  enviarAvaliacao(rate) {
    console.log(rate);
    console.log('enviar avaliação');
  }

  // editaVeiculo() {
  //   this.veiculoService
  //   .alteraVeiculo(this.veiculoEntity)
  //   .then((veiculoEntityResult: VeiculoEntity) => {
  //     this.loading.dismiss();
  //     this.toastMessage = 'Seu veículo foi atualizado!';
  //     this.presentToast();
  //     setTimeout(() => {
  //       this.navCtrl.setRoot(VeiculosListPage);
  //     }, 3000);
  //   }, (err) => {
  //     this.loading.dismiss();
  //     this.alertCtrl.create({
  //       subTitle: err.message,
  //       buttons: ['OK']
  //     }).present();
  //   });
  // }

}
