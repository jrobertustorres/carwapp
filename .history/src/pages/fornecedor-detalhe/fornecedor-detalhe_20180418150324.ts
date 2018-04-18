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
    try {
      
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
    this.fornecedorEntity.idFornecedor = this.idFornecedor;

    console.log(this.fornecedorEntity);

    // this.fornecedorService
    // .findDadosFornecedor(this.fornecedorEntity)
    // .then((dados) => {
    // this.fornecedorDetalhe = dados;

    this.fornecedorService.findDadosFornecedor(this.fornecedorEntity)
        .then((fornecedorEntityResult: FornecedorEntity) => {
          this.fornecedorDetalhe = fornecedorEntityResult;
          this.loading.dismiss();
          console.log(this.fornecedorDetalhe);
        }, (err) => {
          this.loading.dismiss();
          this.alertCtrl.create({
            subTitle: err.message,
            buttons: ['OK']
          }).present();
        });

    // this.loading.dismiss();
    // }).catch(err => {
    //   this.loading.dismiss();
    //   this.alertCtrl.create({
    //     subTitle: err.message,
    //     buttons: ['OK']
    //   }).present();
    // });

  }
  catch (err){
    if(err instanceof RangeError){
      console.log('out of range');
    }
    console.log(err);
  }
  }

}
