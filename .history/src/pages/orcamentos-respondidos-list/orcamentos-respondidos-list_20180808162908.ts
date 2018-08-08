import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { OrcamentoService } from '../../providers/orcamento-service';

//ENTITYS
import { CotacaoEntity } from '../../model/cotacao-entity';

//PAGES
import { DetalheCotacaoPage } from '../detalhe-cotacao/detalhe-cotacao';

@IonicPage()
@Component({
  selector: 'page-orcamentos-respondidos-list',
  templateUrl: 'orcamentos-respondidos-list.html',
})
export class OrcamentosRespondidosListPage {
  private loading = null;
  public idOrcamento: number;
  private cotacaoEntity: CotacaoEntity;
  private cotacaoEntityResult;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private orcamentoService: OrcamentoService,
              public navParams: NavParams) {
    this.cotacaoEntity = new CotacaoEntity();
    this.idOrcamento = navParams.get('idOrcamento');
  }

  ngOnInit() {
    this.findOrcamentosRespondidosList();
  }

  ionViewDidLoad() {
  }

  findOrcamentosRespondidosList() {
    this.cotacaoEntity.idOrcamento = this.idOrcamento;
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...',
      });
      this.loading.present();

      this.orcamentoService.findCotacoesRespondidas(this.cotacaoEntity)
      .then((cotacaoEntityResult: CotacaoEntity) => {
        this.cotacaoEntityResult = cotacaoEntityResult;

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

  callDetalheCotacao(idCotacao) {
    this.navCtrl.push(DetalheCotacaoPage, {idCotacao: idCotacao});
  }

}
