import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

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
    this.veiculoService
    .findListMarcaVeiculo()
    .then((dados) => {
    this.marcasVeiculo = dados;

    console.log(this.marcasVeiculo);

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
