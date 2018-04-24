import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-tipo-filtro-servico',
  templateUrl: 'modal-tipo-filtro-servico.html',
})
export class ModalTipoFiltroServicoPage {
  private estadoDisabled: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.estadoDisabled = true;
    // this.findServicosList(this.idTipoServico);
  }

  disableEstado(status) {
    this.estadoDisabled = status;
    console.log(this.estadoDisabled);
  }

}
