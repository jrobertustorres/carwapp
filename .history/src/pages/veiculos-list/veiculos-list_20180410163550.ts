import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//PAGES
import { VeiculoPage } from './../veiculo/veiculo';

//ENTITYS
import { VeiculoEntity } from '../../model/veiculo-entity';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

@IonicPage()
@Component({
  selector: 'page-veiculos-list',
  templateUrl: 'veiculos-list.html',
})
export class VeiculosListPage {
  private veiculoEntity: VeiculoEntity;
  private loading = null;
  private veiculosResult;
  // public idVeiculo: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,) {
    this.veiculoEntity = new VeiculoEntity();
    // this.idVeiculo = navParams.get('idVeiculo');
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.findVeiculosCliente();
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

      // this.veiculoService
      //   .findVeiculosCliente()
      //   .then((veiculosResult) => {
      //     this.veiculoEntity = veiculosResult;

      //     console.log(this.veiculosResult);

      //     this.loading.dismiss();
      //   })
      //   .catch(err => {
      //     this.loading.dismiss();
      //     this.alertCtrl.create({
      //       subTitle: err.message,
      //       buttons: ['OK']
      //     }).present();
      //   });
    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

}
