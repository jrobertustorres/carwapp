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
      content: 'Aguarde...',
      // dismissOnPageChange: true
    });
    this.loading.present();
    
    this.veiculoService
    .findListMarcaVeiculo()
    .then((dados) => {
    this.marcasVeiculo = dados;

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

  setMarca(idMarca, marca) {
    this.viewCtrl.dismiss({
      idMarca: idMarca, marca: marca
    });
  }

  getItems(searchbar) {
    let q = searchbar.srcElement.value;
    if (!q) {
      this.findMarcaVeiculo();
      // return;
    }
  
    this.marcasVeiculo = this.marcasVeiculo.filter((v) => {
      // if(v.servico && v.tipoServico && q) {
      if(v.marca && q) {
        if (v.marca.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        // if (v.servico.toLowerCase().indexOf(q.toLowerCase()) && v.tipoServico.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  

}
