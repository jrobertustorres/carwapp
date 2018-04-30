import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-imagem-fornecedor',
  templateUrl: 'modal-imagem-fornecedor.html',
})
export class ModalImagemFornecedorPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

}
