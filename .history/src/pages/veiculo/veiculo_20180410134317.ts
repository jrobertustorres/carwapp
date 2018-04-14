import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

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
              public alertCtrl: AlertController,
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
    this.loading.dismiss();
  }, (err) => {
    this.loading.dismiss();
    this.alertCtrl.create({
      subTitle: err.message,
      buttons: ['OK']
    }).present();
  });
  }

  ionViewDidLoad() {
  }

}
