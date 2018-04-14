import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

//PAGES
import { TiposServicoListPage } from './../tipos-servico-list/tipos-servico-list';
import { VeiculosListPage } from '../veiculos-list/veiculos-list';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

//ENTITYS
import { VeiculoEntity } from '../../model/veiculo-entity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private loading = null;
  private veiculoEntity: VeiculoEntity;

  constructor(public navCtrl: NavController,
              private veiculoService: VeiculoService,
              public loadingCtrl: LoadingController) {
    this.veiculoEntity = new VeiculoEntity();

  }

  ngOnInit() {
    this.verificaPossuiVeiculo();
  }

  openTiposServicoList() {
    this.navCtrl.push(VeiculosListPage);
    // this.navCtrl.push(TiposServicoListPage);
  }

  verificaPossuiVeiculo() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.veiculoService.possuiVeiculo()
      .then((possuiVeiculo: VeiculoEntity) => {
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
