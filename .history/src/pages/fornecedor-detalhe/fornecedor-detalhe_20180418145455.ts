import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';

//ENTITYS
import { FornecedorEntity } from '../../model/fornecedor-entity';

@IonicPage()
@Component({
  selector: 'page-fornecedor-detalhe',
  templateUrl: 'fornecedor-detalhe.html',
})
export class FornecedorDetalhePage {
  private idFornecedor: number;
  private loading = null;
  private fornecedorDetalhe: any;
  private fornecedorEntity: FornecedorEntity;

  constructor(public navCtrl: NavController,
              private fornecedorService: FornecedorService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.fornecedorEntity = new FornecedorEntity();
    this.idFornecedor = navParams.get('idFornecedor');
  }

  ngOnInit() {
    this.findDadosFornecedorList();
  }

  ionViewDidLoad() {
  }

  findDadosFornecedorList() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
    this.fornecedorEntity = new FornecedorEntity();
    this.fornecedorEntity.idFornecedor = this.idFornecedor;

    console.log(this.fornecedorEntity);

    this.fornecedorService
    .findDadosFornecedor(this.fornecedorEntity)
    .then((dados) => {
    this.fornecedorDetalhe = dados;

    console.log(this.fornecedorDetalhe);

    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

}
