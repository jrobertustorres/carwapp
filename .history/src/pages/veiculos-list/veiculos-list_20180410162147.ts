import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//PAGES
import { VeiculoPage } from './../veiculo/veiculo';

@IonicPage()
@Component({
  selector: 'page-veiculos-list',
  templateUrl: 'veiculos-list.html',
})
export class VeiculosListPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  inserirVeiculo() {
    this.navCtrl.push(VeiculoPage);
  }

}
