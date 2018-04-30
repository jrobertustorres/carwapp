import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//SERVICES
import { OrcamentoService } from '../../providers/orcamento-service';

//ENTITYS
import { OrcamentoEntity } from './../../model/orcamento-entity';

@IonicPage()
@Component({
  selector: 'page-orcamentos-list',
  templateUrl: 'orcamentos-list.html',
})
export class OrcamentosListPage {
  private orcamentoEntity: OrcamentoEntity;

  constructor(public navCtrl: NavController, 
              private orcamentoService: OrcamentoService,
              public navParams: NavParams) {
    this.orcamentoEntity = new OrcamentoEntity();
  }

  ngOnInit() {
    this.findOrcamentosList();
  }

  ionViewDidLoad() {
  }

  findOrcamentosList() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.veiculoService.findVeiculosCliente()
      .then((veiculosResult: VeiculoEntity) => {
        this.veiculosResult = veiculosResult;

        console.log(this.veiculosResult);
  
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
