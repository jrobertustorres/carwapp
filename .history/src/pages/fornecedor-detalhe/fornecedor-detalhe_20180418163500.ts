import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

//SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';

//ENTITYS
import { FornecedorEntity } from '../../model/fornecedor-entity';

//PAGES
import { AvaliacaoFornecedorPage } from './../avaliacao-fornecedor/avaliacao-fornecedor';

@IonicPage()
@Component({
  selector: 'page-fornecedor-detalhe',
  templateUrl: 'fornecedor-detalhe.html',
})
export class FornecedorDetalhePage {
  private idFornecedor: number;
  private loading = null;
  // private fornecedorDetalhe: any;
  private fornecedorEntity: FornecedorEntity;

  constructor(public navCtrl: NavController,
              private fornecedorService: FornecedorService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private sanitizer: DomSanitizer,
              public modalCtrl: ModalController,
              public navParams: NavParams) {
    this.fornecedorEntity = new FornecedorEntity();
    this.idFornecedor = navParams.get('idFornecedor');
  }

  ngOnInit() {
    this.findDadosFornecedorList();
  }

  ionViewDidLoad() {
  }

  presentModal() {
    let modal = this.modalCtrl.create(AvaliacaoFornecedorPage);
    modal.present();
  }

  findDadosFornecedorList() {
    try {
      
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
    this.fornecedorEntity.idFornecedor = this.idFornecedor;

    this.fornecedorService.findDadosFornecedor(this.fornecedorEntity)
        .then((fornecedorEntityResult: FornecedorEntity) => {
          this.fornecedorEntity = fornecedorEntityResult;
          this.loading.dismiss();
          console.log(this.fornecedorEntity);
        }, (err) => {
          this.loading.dismiss();
          this.alertCtrl.create({
            subTitle: err.message,
            buttons: ['OK']
          }).present();
        });

  }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

}
