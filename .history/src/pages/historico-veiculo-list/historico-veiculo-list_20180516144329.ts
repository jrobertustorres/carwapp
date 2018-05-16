import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { VeiculoService } from '../../providers/veiculo-service';

//ENTITYS
import { HistoricoVeiculoEntity } from './../../model/historico-veiculo-entity';

//PAGES
import { HistoricoVeiculoPage } from './../historico-veiculo/historico-veiculo';

@IonicPage()
@Component({
  selector: 'page-historico-veiculo-list',
  templateUrl: 'historico-veiculo-list.html',
})
export class HistoricoVeiculoListPage {
  private loading = null;
  private historicoList: any;
  public idVeiculo: number;
  private historicoVeiculoEntity: HistoricoVeiculoEntity;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.historicoVeiculoEntity = new HistoricoVeiculoEntity();
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

    this.historicoVeiculoEntity.idVeiculo = this.idVeiculo;
    this.veiculoService
    .findHistoricoVeiculoByVeiculo(this.historicoVeiculoEntity)
    .then((dados) => {
    this.historicoList = dados;

    console.log(this.historicoList);

    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  openDetalheHistorico(idOrcamento) {
    this.navCtrl.push(HistoricoVeiculoPage, {
      idOrcamento: idOrcamento
    })
  }

}
