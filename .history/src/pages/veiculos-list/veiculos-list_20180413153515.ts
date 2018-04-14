import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';

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
  public idVeiculo: number;
  private previousView: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.veiculoEntity = new VeiculoEntity();
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.findVeiculosCliente();
    let previousView:ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    
        console.log(previousView.component.name);
        if(previousView.component.name == 'HomePage') {
          console.log('aaaaaaaaaaaaaaa');
          this.previousView = 'HomePage';
        }
  }

  onPageDidEnter() {
    // this.navController.last() strangely equals the view which entered
    // let previousView:ViewController = this.navCtrl.getPrevious(this.navCtrl.last());

    // console.log(previousView);
 
    // if (previousView != null && (<any> previousView).instance instanceof VeiculosListPage) {
        // doSomeStuffs();
  //  } else {
        // doSomeOtherStuffs();
  //  }
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

  callNextView(idVeiculo, placa) {
    console.log(this.previousView);
  }

  detalheVeiculo(idVeiculo, placa) {
    this.navCtrl.push(VeiculoPage, {
      idVeiculo: idVeiculo,
      placa: placa
    })
  }

}
