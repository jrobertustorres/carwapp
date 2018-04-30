import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { OrcamentoService } from '../../providers/orcamento-service';

//ENTITYS
import { OrcamentoEntity } from './../../model/orcamento-entity';

@IonicPage()
@Component({
  selector: 'page-orcamentos-respondidos-list',
  templateUrl: 'orcamentos-respondidos-list.html',
})
export class OrcamentosRespondidosListPage {
  private loading = null;
  private idOrcamento: number;
  private orcamentoEntity: OrcamentoEntity;
  private orcamentoEntityResult;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private orcamentoService: OrcamentoService,
              public navParams: NavParams) {
    this.idOrcamento = navParams.get('idOrcamento');
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

      this.orcamentoService.findCotacoesRespondidas(this.idOrcamento)
      .then((cotacaoEntityResult: CotacaoEntity) => {
        this.orcamentoEntityResult = cotacaoEntityResult;

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
