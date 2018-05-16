import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { VeiculoService } from '../../providers/veiculo-service';

//ENTITYS
import { HistoricoVeiculoEntity } from './../../model/historico-veiculo-entity';

@IonicPage()
@Component({
  selector: 'page-historico-veiculo',
  templateUrl: 'historico-veiculo.html',
})
export class HistoricoVeiculoPage {
  public idOrcamento: number;
  private loading = null;
  private historicoVeiculoEntity: HistoricoVeiculoEntity;

  constructor(public navCtrl: NavController,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.idOrcamento = navParams.get('idOrcamento');
    this.historicoVeiculoEntity = new HistoricoVeiculoEntity();
  }

  ngOnInit() {
    this.getDetalheHistorico();
  }

  ionViewDidLoad() {
  }

  getDetalheHistorico() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...',
        // dismissOnPageChange: true
      });
      this.loading.present();

      this.historicoVeiculoEntity.idOrcamento = this.idOrcamento;

      this.veiculoService.findDetalhaHistoricoVeiculo(this.historicoVeiculoEntity)
      .then((historicoVeiculoEntityResult: HistoricoVeiculoEntity) => {
        this.historicoVeiculoEntity = historicoVeiculoEntityResult;

        console.log(this.historicoVeiculoEntity);
        
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
