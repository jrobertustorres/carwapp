import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

@IonicPage()
@Component({
  selector: 'page-modal-marca-veiculo',
  templateUrl: 'modal-marca-veiculo.html',
})
export class ModalMarcaVeiculoPage {
  private loading = null;
  private marcasVeiculo = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private veiculoService: VeiculoService,
              private sanitizer: DomSanitizer,
              public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.findMarcaVeiculo();
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  findMarcaVeiculo() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
    this.veiculoService
    .findListMarcaVeiculo()
    .then((dados) => {
    this.marcasVeiculo = dados;
    // this.marcasVeiculo.logo
    // this.cameraUrl = 'data:image/jpeg;base64,' + imageData;

    console.log(this.marcasVeiculo.logo);

      // if (this.idVeiculo) {
      //   this.getDetalheVeiculo();
      // } else {
      //   this.loading.dismiss();
      // }
        this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  setMarca(valor) {
    console.log(valor);
    // if(this.filtroForm.valid) {
      this.viewCtrl.dismiss({
      filter: valor
      });
    // }
    // this.closeModal();
  }
  

}
