import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';

//PAGES
import { VeiculoPage } from './../veiculo/veiculo';
import { TiposServicoListPage } from '../tipos-servico-list/tipos-servico-list';
import { HistoricoVeiculoListPage } from '../historico-veiculo-list/historico-veiculo-list';

//ENTITYS
import { VeiculoEntity } from '../../model/veiculo-entity';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

@IonicPage()
@Component({
  selector: 'page-veiculos-list',
  templateUrl: 'veiculos-list.html',
})
export class VeiculosListPage {
  private veiculoEntity: VeiculoEntity;
  private loading = null;
  private veiculosResult;
  public idVeiculo: number;
  private previousView: string;
  private historicoPage: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private veiculoService: VeiculoService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.veiculoEntity = new VeiculoEntity();
    this.historicoPage = navParams.get("historicoPage");
    console.log(this.historicoPage);
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.findVeiculosCliente();
    let previousView:ViewController = this.navCtrl.getPrevious(this.navCtrl.last());
    if(previousView.component.name == 'HomePage') {
      this.previousView = 'HomePage';
    } 
  }

  inserirVeiculo() {
    this.navCtrl.push(VeiculoPage);
  }

  findVeiculosCliente() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.veiculoService.findVeiculosCliente()
      .then((veiculosResult: VeiculoEntity) => {
        this.veiculosResult = veiculosResult;

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

  callNextView(idVeiculo, placa) {
    console.log(this.historicoPage);
    if (this.previousView == 'HomePage' && this.historicoPage == undefined) {
      this.navCtrl.push(TiposServicoListPage, {
        idVeiculo: idVeiculo})
    } else if(this.historicoPage == true) {
      this.navCtrl.push(HistoricoVeiculoListPage, {
        idVeiculo: idVeiculo});
        // this.historicoPage = false;
      } else {
        this.detalheVeiculo(idVeiculo, placa);
      }
  }

  detalheVeiculo(idVeiculo, placa) {
    this.navCtrl.push(VeiculoPage, {
      idVeiculo: idVeiculo,
      placa: placa
    })
  }

}
