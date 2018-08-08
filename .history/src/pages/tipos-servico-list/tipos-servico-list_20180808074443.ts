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
  private aux = [];

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
        content: 'Aguarde...',
        dismissOnPageChange: true
      });
      this.loading.present();

      this.servicoService.findTipoServico()
      .then((tipoServicoResult: TipoServicoEntity) => {
        this.tiposServico = tipoServicoResult;

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

  getItems(searchbar) {
    let q = searchbar.srcElement.value;
    if (!q) {
      this.findTipoServico();
    }
    this.aux = this.aux.length == 0 ? this.tiposServico : this.aux; 

    if(this.tiposServico.length == 0) {
      this.tiposServico = this.aux;
    }
  
    this.tiposServico = this.tiposServico.filter((v) => {
      if(v.tipoServico && q) {
        if (v.tipoServico.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  openServicosList(idTipoServico, tipoServicoHeader) {
    this.navCtrl.push(ServicosListPage, {
      idTipoServico: idTipoServico,
      tipoServicoHeader: tipoServicoHeader,
      idVeiculo: this.idVeiculo
    })
  }

}
