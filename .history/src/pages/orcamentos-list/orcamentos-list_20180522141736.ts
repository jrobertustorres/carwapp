import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { OrcamentoService } from '../../providers/orcamento-service';

//ENTITYS
import { OrcamentoEntity } from './../../model/orcamento-entity';

//PAGES
// import { OrcamentoPage } from './../orcamento/orcamento';
import { DetalheCotacaoPage } from './../detalhe-cotacao/detalhe-cotacao';
import { OrcamentosRespondidosListPage } from '../orcamentos-respondidos-list/orcamentos-respondidos-list';

@IonicPage()
@Component({
  selector: 'page-orcamentos-list',
  templateUrl: 'orcamentos-list.html',
})
export class OrcamentosListPage {
  private loading = null;
  private orcamentoEntity: OrcamentoEntity;
  private orcamentoEntityResult;

  constructor(public navCtrl: NavController, 
              private orcamentoService: OrcamentoService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.orcamentoEntity = new OrcamentoEntity();
  }

  ngOnInit() {
    this.findOrcamentosList();
  }

  ionViewDidLoad() {
  }

  getItems(searchbar) {
    // set q to the value of the searchbar
    let q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      this.findOrcamentosList();
      // return;
    }
  
    this.orcamentoEntityResult = this.orcamentoEntityResult.filter((v) => {
      if(v.dataOrcamento && v.placaVeiculo && v.statusOrcamentoEnum && q) {
        if (v.dataOrcamento.toLowerCase().indexOf(q.toLowerCase()) && v.placaVeiculo.toLowerCase().indexOf(q.toLowerCase()) && v.statusOrcamentoEnum.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  findOrcamentosList() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...',
        dismissOnPageChange: true
      });
      this.loading.present();

      this.orcamentoService.findOrcamentoByCliente()
      .then((orcamentoEntityResult: OrcamentoEntity) => {
        this.orcamentoEntityResult = orcamentoEntityResult;

        console.log(this.orcamentoEntityResult);

        // this.loading.dismiss();
      }, (err) => {
        // this.loading.dismiss();
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

  verificaStatusOrcamento(idOrcamento, idCotacao, statusOrcamento) {
    // if (statusOrcamento == 'ABERTO') {
    //   this.navCtrl.push(OrcamentoPage, {idOrcamento: idOrcamento});
    // } else 
    if (statusOrcamento == 'RESPONDIDO') {
      this.navCtrl.push(OrcamentosRespondidosListPage, {idOrcamento: idOrcamento});
    } else if (statusOrcamento == 'CONCLUIDO' || statusOrcamento == 'ESCOLHIDO') {
      this.navCtrl.push(DetalheCotacaoPage, {idCotacao: idCotacao});
    }
  }

}
