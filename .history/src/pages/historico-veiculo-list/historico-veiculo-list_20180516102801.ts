import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { VeiculoService } from '../../providers/veiculo-service';

@IonicPage()
@Component({
  selector: 'page-historico-veiculo-list',
  templateUrl: 'historico-veiculo-list.html',
})
export class HistoricoVeiculoListPage {
  private loading = null;
  private historicoList: any;
  public idVeiculo: number;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              public navParams: NavParams) {

    this.idVeiculo = navParams.get('idVeiculo');
  }

  ngOnInit() {
    this.findHistoricosList();
  }

  ionViewDidLoad() {
  }

  findHistoricosList() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...',
      // dismissOnPageChange: true
    });
    this.loading.present();

    this.veiculoService
    .findHistoricoVeiculoByVeiculo(idVeiculo)
    .then((dados) => {
    this.historicoList = dados;
    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

}
