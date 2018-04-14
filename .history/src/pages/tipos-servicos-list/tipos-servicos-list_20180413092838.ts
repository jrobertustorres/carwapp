import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { ServicoService } from '../../providers/servico-service';

//ENTITYS
import { TipoServicoEntity } from '../../model/tipo-servico-entity';

@IonicPage()
@Component({
  selector: 'page-tipos-servicos-list',
  templateUrl: 'tipos-servicos-list.html',
})
export class TiposServicosListPage {
  private loading = null;
  private tipoServicoEntity: TipoServicoEntity;
  private tiposServico;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private servicoService: ServicoService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.tipoServicoEntity = new TipoServicoEntity();
  }

  ngOnInit() {
    this.findTipoServico();
  }

  ionViewDidLoad() {
  }

  findTipoServico() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.servicoService.findTipoServico()
      .then((tipoServicoResult: TipoServicoEntity) => {
        this.tiposServico = tipoServicoResult;

        console.log(this.tiposServico);
  
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
