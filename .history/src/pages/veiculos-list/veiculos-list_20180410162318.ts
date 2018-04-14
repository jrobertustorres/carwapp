import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//PAGES
import { VeiculoPage } from './../veiculo/veiculo';

//ENTITYS
import { VeiculoEntity } from '../../model/veiculo-entity';

@IonicPage()
@Component({
  selector: 'page-veiculos-list',
  templateUrl: 'veiculos-list.html',
})
export class VeiculosListPage {
  private veiculoEntity: VeiculoEntity;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.veiculoEntity = new VeiculoEntity();
  }

  ionViewDidLoad() {
  }

  inserirVeiculo() {
    this.navCtrl.push(VeiculoPage);
  }

  findVeiculosCliente() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.veiculoService
        .getDadosUsuario()
        .then((dadosUsuarioDetalheResult) => {
          this.veiculoEntity = dadosUsuarioDetalheResult;

          console.log(this.usuarioDetalheEntity);

          this.loadingDados.dismiss();
          // this.getCidadesByEstadoUsuario(dadosUsuarioDetalheResult.idEstado);
        })
        .catch(err => {
          this.loadingDados.dismiss();
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
