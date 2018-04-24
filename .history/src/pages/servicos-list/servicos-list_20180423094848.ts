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
  public idVeiculo: number;
  private loading = null;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private servicoService: ServicoService,
              public alertCtrl: AlertController,
              public navParams: NavParams) {

    this.idTipoServico = navParams.get('idTipoServico');
    this.idVeiculo = navParams.get('idVeiculo');
  }

  ngOnInit() {
    this.findServicosList(this.idTipoServico);
  }

  ionViewDidLoad() {
  }

  findServicosList(idTipoServico) {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.servicoService
    .findServicoByIdTipoServico(idTipoServico)
    .then((dados) => {
    this.servicos = dados;
    console.log(this.servicos);
    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione o tipo de busca');

    alert.addInput({
      type: 'radio',
      label: 'Buscar oficinas em torno de mim',
      value: 'raio',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Selecinar cidade específica',
      value: 'cidade',
      checked: false
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        // this.testRadioOpen = false;
        // this.testRadioResult = data;
      }
    });
    alert.present();
  }

  openOficinasList(idServico) {
    this.navCtrl.push(OficinasListPage, {
      idServico: idServico
    })
  }

}
