import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { ServicoService } from '../../providers/servico-service';

//ENTITYS
import { TipoServicoEntity } from '../../model/tipo-servico-entity';

//PAGES
import { ServicosListPage } from '../servicos-list/servicos-list';

@IonicPage()
@Component({
  selector: 'page-tipos-servico-list',
  templateUrl: 'tipos-servico-list.html',
})
export class TiposServicoListPage {
  private loading = null;
  private tipoServicoEntity: TipoServicoEntity;
  private tiposServico;
  public idVeiculo: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private servicoService: ServicoService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.tipoServicoEntity = new TipoServicoEntity();
    this.idVeiculo = navParams.get('idVeiculo');
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

  openServicosList(idTipoServico) {
    this.navCtrl.push(ServicosListPage, {
      idTipoServico: idTipoServico,
      idVeiculo: this.idVeiculo
    })
  }

}
