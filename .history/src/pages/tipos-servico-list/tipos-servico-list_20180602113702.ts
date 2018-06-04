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
        content: 'Aguarde...',
        // dismissOnPageChange: true
      });
      this.loading.present();

      console.log('entrou');

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

  // getItems(ev: any) {
  //   // Reset items back to all of the items
  //   // this.findTipoServico();
  //   console.log(ev);
  //   let q = ev.srcElement.value;
  //   if (!q) {
  //     this.findTipoServico();
  //   }

  //   // set val to the value of the searchbar
  //   const val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     console.log(val);
  //     console.log(this.tiposServico);
      
  //     this.tiposServico = this.tiposServico.filter((item) => {
  //       console.log(item.tipoServico);
  //       return (item.tipoServico.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }

  getItems(searchbar) {
    console.log(searchbar);
    let q = searchbar.srcElement.value;
    console.log(q);
    if (!q) {
      this.findTipoServico();
    }

    console.log(this.tiposServico);
  
    this.tiposServico = this.tiposServico.filter((v) => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
      console.log(v.tiposServico);
      console.log(q);
      if(v.tipoServico && q) {
        if (v.tipoServico.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          console.log(v.tipoServico);
          return true;
        }
        console.log('dentro do return false');
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