import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-avaliacao-fornecedor',
  templateUrl: 'avaliacao-fornecedor.html',
})
export class AvaliacaoFornecedorPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  enviarAvaliacao() {
    console.log('enviar avaliação');
  }

}
