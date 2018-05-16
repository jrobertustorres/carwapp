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
      // this.veiculoEntity = new VeiculoEntity();
      this.historicoVeiculoEntity.idOrcamento = this.idOrcamento;

      this.veiculoService.findHistoricoVeiculoByVeiculo(this.historicoVeiculoEntity)
      .then((historicoVeiculoEntityResult: HistoricoVeiculoEntity) => {
        this.historicoVeiculoEntity = historicoVeiculoEntityResult;
        
        this.loading.dismiss();
        this.findListModeloVeiculo(veiculoEntityResult.idMarca);

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
