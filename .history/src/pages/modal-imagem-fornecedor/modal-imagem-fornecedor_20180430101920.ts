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

  ngOnInit() {
    this.findImagesFornecedor();
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  findImagesFornecedor() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.fornecedorEntity = new FornecedorEntity();
    this.fornecedorEntity.idServico = this.idServico;
    this.fornecedorEntity.idCidade = this.idCidade;

    if (!this.idCidade) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.fornecedorEntity.latitude = resp.coords.latitude;
        this.fornecedorEntity.longitude = resp.coords.longitude;

        if (!this.fornecedorEntity.latitude && !this.fornecedorEntity.longitude) {
          this.showLocationText();
        }

        // COLOCAR UMA VALIDAÇÃO AQUI POIS PODE OCORRER DE NÃO SER POSSÍVEL PEGAR OS DADOS DE LAT E LONG

        this.buscaOficinas();

        }).catch((error) => {
          console.log('Error getting location', error);
        });
    } else {
      this.buscaOficinas();
    }
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

}
