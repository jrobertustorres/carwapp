import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { VeiculoService } from '../../providers/veiculo-service';

//ENTITYS
import { HistoricoVeiculoEntity } from './../../model/historico-veiculo-entity';

//PAGES
import { HistoricoVeiculoPage } from './../historico-veiculo/historico-veiculo';

@IonicPage()
@Component({
  selector: 'page-historico-veiculo-list',
  templateUrl: 'historico-veiculo-list.html',
})
export class HistoricoVeiculoListPage {
  private loading = null;
  private historicoList: any;
  public idVeiculo: number;
  private historicoVeiculoEntity: HistoricoVeiculoEntity;
  private aux = [];

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.historicoVeiculoEntity = new HistoricoVeiculoEntity();
    this.idVeiculo = navParams.get('idVeiculo');
  }

  ngOnInit() {
    this.findHistoricosList();
  }

  ionViewDidLoad() {
  }

  loadMore(infiniteScroll) {

    setTimeout(() => {

      this.findHistoricosList();
      infiniteScroll.complete();
    }, 500);
  }

  getItems(searchbar) {
    let q = searchbar.srcElement.value;
    if (!q) {
      this.findHistoricosList();
    }
    this.aux = this.aux.length == 0 ? this.historicoList : this.aux; 

    if(this.historicoList.length == 0) {
      this.historicoList = this.aux;
    }
  
    this.historicoList = this.historicoList.filter((v) => {
      if(v.tipoServicoServicoFormat && v.dataServicoFormat && q) {
        if ((v.tipoServicoServicoFormat.toLowerCase().indexOf(q.toLowerCase()) && v.dataServicoFormat.toLowerCase().indexOf(q.toLowerCase())) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  findHistoricosList() {
    this.historicoVeiculoEntity.idVeiculo = this.idVeiculo;
    this.historicoVeiculoEntity.limitDados = this.historicoVeiculoEntity.limitDados ? this.historicoList.length : null;

    if(this.historicoVeiculoEntity.limitDados == null) {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...',
        // dismissOnPageChange: true
      });
      this.loading.present();
    }

    // this.historicoVeiculoEntity.idVeiculo = this.idVeiculo;
    this.veiculoService
    .findHistoricoVeiculoByVeiculo(this.historicoVeiculoEntity)
    .then((dados) => {
    this.historicoList = dados;
    this.historicoVeiculoEntity.limitDados = this.historicoList.length;

    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  openDetalheHistorico(idHistoricoVeiculo) {
    this.navCtrl.push(HistoricoVeiculoPage, {
      idHistoricoVeiculo: idHistoricoVeiculo
    })
  }

}
