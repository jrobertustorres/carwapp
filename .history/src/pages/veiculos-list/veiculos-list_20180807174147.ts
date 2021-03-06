import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController, ToastController } from 'ionic-angular';

//PAGES
import { VeiculoPage } from './../veiculo/veiculo';
import { TiposServicoListPage } from '../tipos-servico-list/tipos-servico-list';
import { HistoricoVeiculoListPage } from '../historico-veiculo-list/historico-veiculo-list';

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
  private historicoPage: boolean;
  private toastMessage: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
    this.veiculoEntity = new VeiculoEntity();
    this.historicoPage = navParams.get("historicoPage");
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.findVeiculosCliente();
    let previousView:ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    if(previousView.component.name == 'HomePage') {
      this.previousView = 'HomePage';
    } 
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.toastMessage,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  inserirVeiculo() {
    this.navCtrl.push(VeiculoPage);
  }

  findVeiculosCliente() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...',
        dismissOnPageChange: true
      });
      this.loading.present();

      this.veiculoService.findVeiculosCliente()
      .then((veiculosResult: VeiculoEntity) => {
        this.veiculosResult = veiculosResult;
        // if(this.veiculosResult[0]) {
        //   localStorage.setItem('clienteLogado', this.veiculosResult[0].idCliente);
        // }

        console.log(this.loading);

        this.loading ? this.loading.dismiss() : '';
        // this.loading.dismiss();
      }, (err) => {
        this.loading ? this.loading.dismiss() : '';
        // this.loading.dismiss();
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

  callNextView(idVeiculo, placa) {
    if (this.previousView == 'HomePage' && this.historicoPage == undefined) {
      this.navCtrl.push(TiposServicoListPage, {
        idVeiculo: idVeiculo})
    } else if(this.historicoPage == true) {
      this.navCtrl.push(HistoricoVeiculoListPage, {
        idVeiculo: idVeiculo});
      } else {
        this.detalheVeiculo(idVeiculo, placa);
      }
  }

  detalheVeiculo(idVeiculo, placa) {
    this.navCtrl.push(VeiculoPage, {
      idVeiculo: idVeiculo,
      placa: placa
    })
  }

  removerVeiculoConfirm(idVeiculo) {
    let confirm = this.alertCtrl.create({
      title: 'Remover ve??culo',
      subTitle: 'Deseja remover este ve??culo?',
      buttons: [
        {
          text: 'CANCELAR',
          handler: () => {
          }
        },
        {
          text: 'REMOVER',
          handler: () => {
            this.removerVeiculo(idVeiculo);
          }
        }
      ]
    });
    confirm.present();
  }

  removerVeiculo(idVeiculo) {
    this.veiculoEntity.idVeiculo = idVeiculo;
    
    this.veiculoService
    .removerVeiculo(this.veiculoEntity)
    .then((veiculoEntityResult: VeiculoEntity) => {
      let index = this.veiculosResult.indexOf(idVeiculo);
      // if(index > -1){
        this.veiculosResult.splice(index, 1);
      // }
      this.loading.dismiss();
      this.toastMessage = 'O ve??culo foi removido!';

      this.presentToast();
      // setTimeout(() => {
      //   this.navCtrl.setRoot(VeiculosListPage);
      // }, 3000);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

}
