import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-avaliacao-fornecedor',
  templateUrl: 'avaliacao-fornecedor.html',
})
export class AvaliacaoFornecedorPage {

  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  enviarAvaliacao() {
    console.log('enviar avaliação');
  }

}
