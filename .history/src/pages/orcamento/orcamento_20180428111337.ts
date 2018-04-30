import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';

//ENTITYS
import { OrcamentoEntity } from './../../model/orcamento-entity';

//SERVICES
import { OrcamentoService } from '../../providers/orcamento-service';

@IonicPage()
@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
})
export class OrcamentoPage {
  private orcamentoEntity: OrcamentoEntity;
  public idOrcamento: number;
  private loading = null;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private orcamentoService: OrcamentoService,
              public navParams: NavParams) {
    this.orcamentoEntity = new OrcamentoEntity();
    this.idOrcamento = navParams.get('idOrcamento');
  }

  ngOnInit() {
    this.detalheOrcamento();
  }

  ionViewDidLoad() {
  }

  detalheOrcamento() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.orcamentoEntity = new OrcamentoEntity();
      this.orcamentoEntity.idOrcamento = this.idOrcamento;

      console.log(this.orcamentoEntity);

      this.orcamentoService.detalhaOrcamentoByCliente(this.orcamentoEntity)
      .then((orcamentoEntityResult: OrcamentoEntity) => {
        this.orcamentoEntity = orcamentoEntityResult;

        console.log(this.orcamentoEntity);
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
