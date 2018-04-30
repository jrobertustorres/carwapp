import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

//SERVICES
import { FornecedorService } from './../../providers/fornecedor-service';

//INTITYS
import { ImagemFornecedorEntity } from '../../model/imagem-fornecedor-entity';

@IonicPage()
@Component({
  selector: 'page-modal-imagem-fornecedor',
  templateUrl: 'modal-imagem-fornecedor.html',
})
export class ModalImagemFornecedorPage {
  @ViewChild(Slides) slides: Slides;
  private loading = null;
  private imagemFornecedorEntity: ImagemFornecedorEntity;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private fornecedorService: FornecedorService,
              public viewCtrl: ViewController) {
    // this.imagemFornecedorEntity = new ImagemFornecedorEntity();
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
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.imagemFornecedorEntity = new ImagemFornecedorEntity();
      this.imagemFornecedorEntity.idFornecedor = this.idFornecedor;

      this.fornecedorService
        .imagemFornecedor(this.imagemFornecedorEntity)
        .then((imagensResult) => {
          // this.imagemFornecedorEntity = imagensResult;

          console.log(this.imagemFornecedorEntity);

          this.loading.dismiss();
        })
        .catch(err => {
          this.loading.dismiss();
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

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

}
