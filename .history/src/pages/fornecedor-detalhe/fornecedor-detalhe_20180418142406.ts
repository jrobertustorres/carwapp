import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-fornecedor-detalhe',
  templateUrl: 'fornecedor-detalhe.html',
})
export class FornecedorDetalhePage {
  private idFornecedor: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.idFornecedor = navParams.get('idFornecedor');
  }

  ionViewDidLoad() {
  }

}
