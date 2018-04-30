import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//ENTITYS
import { OrcamentoEntity } from './../../model/orcamento-entity';

@IonicPage()
@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
})
export class OrcamentoPage {
  private orcamentoEntity: OrcamentoEntity;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.orcamentoEntity = new OrcamentoEntity();
  }

  ngOnInit() {
    this.detalheOrcamento();
  }

  ionViewDidLoad() {
  }

  detalheOrcamento() {
    getDetalheVeiculo() {
      try {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...'
        });
        this.loading.present();
  
        this.veiculoEntity = new VeiculoEntity();
        this.veiculoEntity.idVeiculo = this.idVeiculo;
  
        console.log(this.veiculoEntity);
  
        this.veiculoService.detalheVeiculosCliente(this.veiculoEntity)
        .then((veiculoEntityResult: VeiculoEntity) => {
          this.veiculoEntity = veiculoEntityResult;
  
          console.log(this.veiculoEntity);
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

}
