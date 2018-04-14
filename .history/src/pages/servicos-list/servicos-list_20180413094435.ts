import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//PAGES
import { OficinasListPage } from './../oficinas-list/oficinas-list';

//SERVICES
import { ServicoService } from '../../providers/servico-service';

@IonicPage()
@Component({
  selector: 'page-servicos-list',
  templateUrl: 'servicos-list.html',
})
export class ServicosListPage {
  private servicos: any;
  public idTipoServico: number;
  private loading = null;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private servicoService: ServicoService,
              public alertCtrl: AlertController,
              public navParams: NavParams) {

    this.idTipoServico = navParams.get('idTipoServico');
  }

  ngOnInit() {
    this.findServicosList(this.idTipoServico);
  }

  ionViewDidLoad() {
  }

  findServicosList(idTipoServico) {
    this.loading = this.loadingCtrl.create({
      content: 'Buscando serviços...'
    });
    this.loading.present();

    this.servicoService
    .findServicoByIdTipoServico(idTipoServico)
    .then((dados) => {
    this.servicos = dados;
    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }


  openOficinasList() {
    this.navCtrl.push(OficinasListPage);
  }

}
