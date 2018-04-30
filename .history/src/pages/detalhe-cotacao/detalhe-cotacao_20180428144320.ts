import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//ENTITYS
import { CotacaoEntity } from '../../model/cotacao-entity';
import { DetalheCotacaoEntity } from './../../model/detalhe-cotacao-entity';

//SERVICES
import { OrcamentoService } from '../../providers/orcamento-service';

@IonicPage()
@Component({
  selector: 'page-detalhe-cotacao',
  templateUrl: 'detalhe-cotacao.html',
})
export class DetalheCotacaoPage {
  private cotacaoEntity: CotacaoEntity;
  private detalheCotacaoEntity: DetalheCotacaoEntity;
  public idCotacao: number;
  private loading = null;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private orcamentoService: OrcamentoService,
              public navParams: NavParams) {
    this.cotacaoEntity = new CotacaoEntity();
    this.detalheCotacaoEntity = new DetalheCotacaoEntity();
    this.idCotacao = navParams.get('idCotacao');
  }

  ngOnInit() {
    this.detalheCotacao();
  }

  ionViewDidLoad() {
  }

  detalheCotacao() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.detalheCotacaoEntity = new DetalheCotacaoEntity();
      this.detalheCotacaoEntity.idCotacao = this.idCotacao;

      this.orcamentoService.detalhaCotacao(this.detalheCotacaoEntity)
      .then((detalheCotacaoEntityResult: DetalheCotacaoEntity) => {
        this.detalheCotacaoEntity = detalheCotacaoEntityResult;

        console.log(this.detalheCotacaoEntity);
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
