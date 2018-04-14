import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

@IonicPage()
@Component({
  selector: 'page-veiculo',
  templateUrl: 'veiculo.html',
})
export class VeiculoPage {
  private tiposVeiculo = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private veiculoService: VeiculoService) {

      this.veiculoService
      .findTipoVeiculo()
      .subscribe(dados => {
      this.tiposVeiculo = dados;
    });
  }

  ionViewDidLoad() {
  }

}
