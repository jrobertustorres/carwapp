import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-orcamentos-respondidos-list',
  templateUrl: 'orcamentos-respondidos-list.html',
})
export class OrcamentosRespondidosListPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ngOnInit() {
    this.findOrcamentosRespondidosList();
  }

  ionViewDidLoad() {
  }

  findOrcamentosRespondidosList() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.orcamentoService.findOrcamentoByCliente()
      .then((orcamentoEntityResult: OrcamentoEntity) => {
        this.orcamentoEntityResult = orcamentoEntityResult;

        console.log(this.orcamentoEntityResult);
  
        this.loading.dismiss();
      }, (err) => {
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

}
