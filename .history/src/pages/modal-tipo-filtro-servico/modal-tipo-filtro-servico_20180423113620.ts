import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-tipo-filtro-servico',
  templateUrl: 'modal-tipo-filtro-servico.html',
})
export class ModalTipoFiltroServicoPage {
  private buttonDisabled: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.buttonDisabled = true;
    // this.findServicosList(this.idTipoServico);
  }

  habilitarCidade() {
    this.buttonDisabled = this.buttonDisabled == true ? true : false;
  }

}
