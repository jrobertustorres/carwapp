import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

//PAGES
import { OficinasListPage } from './../oficinas-list/oficinas-list';
import { ModalTipoFiltroServicoPage } from '../modal-tipo-filtro-servico/modal-tipo-filtro-servico';

//SERVICES
import { ServicoService } from '../../providers/servico-service';

//ENTITYS
import { ServicoEntity } from '../../model/servico-entity';

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
  public showFilter = false;
  public tipoServicoHeader: string;
  private callLoadingSearch = false;
  private servicoEntity: ServicoEntity;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private servicoService: ServicoService,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private geolocation: Geolocation,
              public navParams: NavParams) {

    this.idTipoServico = navParams.get('idTipoServico');
    this.idVeiculo = navParams.get('idVeiculo');
    this.tipoServicoHeader = navParams.get('tipoServicoHeader');
    this.servicoEntity = new ServicoEntity();
  }

  ngOnInit() {
    this.findServicosList(this.idTipoServico);
  }

  ionViewDidLoad() {
  }

  loadMore(infiniteScroll) {

    setTimeout(() => {

      this.findServicosList(this.idTipoServico);
      infiniteScroll.complete();
    }, 500);
  }

  findServicosList(idTipoServico) {
    this.servicoEntity.idTipoServico = idTipoServico;
    this.servicoEntity.limitDados = this.servicoEntity.limitDados ? this.servicos.length : null;
    this.servicoEntity.idVeiculo = this.idVeiculo;

    if(this.servicoEntity.limitDados == null) {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();
    }

    this.servicoService
    .findServicoByIdTipoServico(this.servicoEntity)
    .then((dados) => {
    this.servicos = dados;
    this.servicoEntity.limitDados = this.servicos.length;

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
    let q = searchbar.srcElement.value;
    if (!q) {
      this.findServicosList(this.idTipoServico);
    }
  
    this.servicos = this.servicos.filter((v) => {
      if(v.servico && q) {
        if (v.servico.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        // if (v.servico.toLowerCase().indexOf(q.toLowerCase()) && v.tipoServico.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  showModalTipoFiltro(idServico){
    let modal = this.modalCtrl.create(ModalTipoFiltroServicoPage);

    modal.onDidDismiss((data) => {
      console.log(data);
      console.log(this.idVeiculo);
      if (data) {
        let idCidadeFiltro = data.filter.idCidade ? data.filter.idCidade.idCidade : data.filter.idCidade;
        // let idCidadeFiltro = data.filter.idCidade ? data.filter.idCidade : data.filter.idCidade;
        this.openOficinasList(idServico, idCidadeFiltro, this.idVeiculo);
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
