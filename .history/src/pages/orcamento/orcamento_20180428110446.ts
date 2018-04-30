import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
})
export class OrcamentoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.detalheOrcamento();
  }

  ionViewDidLoad() {
  }

  detalheOrcamento() {
    
  }

}
