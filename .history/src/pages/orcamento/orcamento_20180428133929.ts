import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';

//ENTITYS
import { DetalheOrcamentoEntity } from '../../model/detalhe-orcamento-entity';

//SERVICES
import { OrcamentoService } from '../../providers/orcamento-service';

@IonicPage()
@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
})
export class OrcamentoPage {
  private detalheOrcamentoEntity: DetalheOrcamentoEntity;
  public idOrcamento: number;
  private loading = null;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private orcamentoService: OrcamentoService,
              public navParams: NavParams) {
    this.detalheOrcamentoEntity = new DetalheOrcamentoEntity();
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

      this.detalheOrcamentoEntity = new DetalheOrcamentoEntity();
      this.detalheOrcamentoEntity.idOrcamento = this.idOrcamento;

      this.orcamentoService.detalhaOrcamentoByCliente(this.detalheOrcamentoEntity)
      .then((detalheOrcamentoEntityResult: DetalheOrcamentoEntity) => {
        this.detalheOrcamentoEntity = detalheOrcamentoEntityResult;

        console.log(this.detalheOrcamentoEntity);
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
