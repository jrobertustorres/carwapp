import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

@IonicPage()
@Component({
  selector: 'page-veiculo',
  templateUrl: 'veiculo.html',
})
export class VeiculoPage {
  private tiposVeiculo = {};
  private loading = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private veiculoService: VeiculoService) {

    //   this.veiculoService
    //   .findTipoVeiculo()
    //   .then((dados) => {
    //     console.log(dados);
    //   this.tiposVeiculo = dados;
    // });
  }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
    this.veiculoService
    .findTipoVeiculo()
    .then((dados) => {
      console.log(dados);
    this.tiposVeiculo = dados;
  });
  }

  ionViewDidLoad() {
  }

}
