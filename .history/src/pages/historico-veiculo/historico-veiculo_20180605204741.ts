import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { VeiculoService } from '../../providers/veiculo-service';

//ENTITYS
import { HistoricoVeiculoDetalheEntity } from '../../model/historico-veiculo-detalhe-entity';

@IonicPage()
@Component({
  selector: 'page-historico-veiculo',
  templateUrl: 'historico-veiculo.html',
})
export class HistoricoVeiculoPage {
  public idHistoricoVeiculo: number;
  private loading = null;
  private historicoVeiculoDetalheEntity: HistoricoVeiculoDetalheEntity;

  constructor(public navCtrl: NavController,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.idHistoricoVeiculo = navParams.get('idHistoricoVeiculo');
    this.historicoVeiculoDetalheEntity = new HistoricoVeiculoDetalheEntity();
  }

  ngOnInit() {
    this.getDetalheHistorico();
  }

  ionViewDidLoad() {
  }

  getDetalheHistorico() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.historicoVeiculoDetalheEntity.idHistoricoVeiculo = this.idHistoricoVeiculo;

      this.veiculoService.findDetalhaHistoricoVeiculo(this.historicoVeiculoDetalheEntity)
      .then((historicoVeiculoEntityResult: HistoricoVeiculoDetalheEntity) => {
        this.historicoVeiculoDetalheEntity = historicoVeiculoEntityResult;

        this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });

    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }

  }

}
