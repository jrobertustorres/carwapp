import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';

//PAGES
import { OficinasListPage } from './../oficinas-list/oficinas-list';
import { ModalTipoFiltroServicoPage } from '../modal-tipo-filtro-servico/modal-tipo-filtro-servico';

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
  public servicosSelecionados: number[] = [];

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private servicoService: ServicoService,
              public modalCtrl: ModalController,
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
    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  // showRadio() {
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle('Selecione o tipo de busca');

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Buscar oficinas em torno de mim',
  //     value: 'raio',
  //     checked: true
  //   });
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Selecinar cidade específica',
  //     value: 'cidade',
  //     checked: false
  //   });
  //   alert.addInput({
  //     type: 'checkbox',
  //     label: 'Estados',
  //     value: 'estado',
  //     checked: false
  //   });

  //   alert.addButton('Cancelar');
  //   alert.addButton({
  //     text: 'OK',
  //     handler: data => {
  //       this.testRadioOpen = false;
  //       this.testRadioResult = data;
  //     }
  //   });
  //   alert.present();
  // }

  showModalTipoFiltro(idServico){
    let modal = this.modalCtrl.create(ModalTipoFiltroServicoPage);

    modal.onDidDismiss((data) => {

      if (data) {
        this.openOficinasList(idServico, data.filter.idCidade, this.idVeiculo);
      }
    });

    modal.present();
  }

  openOficinasList(idServico, idCidade, idVeiculo) {
    this.navCtrl.push(OficinasListPage, {
      idServico: idServico,
      idCidade: idCidade,
      idVeiculo: this.idVeiculo
    })
  }

}
