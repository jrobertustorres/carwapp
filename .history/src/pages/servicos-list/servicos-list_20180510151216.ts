import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
              private geolocation: Geolocation,
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

  getItems(searchbar) {
    // Reset items back to all of the items
    // this.initializeItems();
    // this.findServicosList(this.idTipoServico);
  
    // set q to the value of the searchbar
    let q = searchbar.srcElement.value;

    console.log(q);
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      this.findServicosList(this.idTipoServico);
      // return;
    }
  
    this.servicos = this.servicos.filter((v) => {
      console.log(v.servico);
      console.log(v.tipoServico);
      console.log(q);

      if(v.servico && v.tipoServico && q) {
        if (v.servico.toLowerCase().indexOf(q.toLowerCase()) && v.tipoServico.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    // this.countryList = this.countryList.filter((v) => {
    //   if(v.name && q) {
    //     if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
    //       return true;
    //     }
    //     return false;
    //   }
    // });
  
    // console.log(q, this.countryList.length);
  
  }

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
