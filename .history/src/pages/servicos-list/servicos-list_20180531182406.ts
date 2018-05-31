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

  // $scope.loadMoreSearch = function() {
  //   if (($scope.nomeProdutoFiltro.limiteDados != $scope.produtosFiltrados.length) && ($scope.nomeProduto)) {
  //       $rootScope.buscaProdutoByNome($scope.nomeProduto);
  //   }
  // }

  // doInfinite(infiniteScroll) {
    loadMore(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      // for (let i = 0; i < 30; i++) {
      //   this.items.push( this.items.length );
      // }

      this.findServicosList(this.idTipoServico);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  findServicosList(idTipoServico) {
    this.servicoEntity.idTipoServico = idTipoServico;
    this.servicoEntity.limitDados = this.servicoEntity.limitDados ? this.servicos.length : null;

    if(this.servicoEntity.limitDados == null) {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();
    }

    // if ($scope.produtosFiltrados != null) {
    //   $scope.nomeProdutoFiltro.limiteDados = $scope.produtosFiltrados.length;
    // } else {
    //     $scope.nomeProdutoFiltro.limiteDados = 0;
    // }
    // this.servicoEntity = new ServicoEntity();
    

    console.log(this.servicoEntity);

    this.servicoService
    .findServicoByIdTipoServico(this.servicoEntity)
    .then((dados) => {
    this.servicos = dados;
    this.servicoEntity.limitDados = this.servicos.length;

    console.log(this.servicos);

    // this.callLoadingSearch = true;

    // if (this.servicoEntity.limitDados = this.servicos.length) {
    //   this.callLoadingSearch = false;
    // }

    if(this.servicoEntity.limitDados == null) {
      this.loading.dismiss();
    }
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  getItems(searchbar) {
    // set q to the value of the searchbar
    let q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      this.findServicosList(this.idTipoServico);
      // return;
    }
  
    this.servicos = this.servicos.filter((v) => {
      // if(v.servico && v.tipoServico && q) {
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
      if (data) {
        let idCidadeFiltro = data.filter.idCidade ? data.filter.idCidade.idCidade : data.filter.idCidade;
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
