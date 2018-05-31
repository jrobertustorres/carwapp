import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-marca-veiculo',
  templateUrl: 'modal-marca-veiculo.html',
})
export class ModalMarcaVeiculoPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMarcaVeiculoPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
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
