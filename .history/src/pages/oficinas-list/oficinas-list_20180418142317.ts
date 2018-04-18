import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';

//SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';

//PAGES
import { FornecedorDetalhePage } from './../fornecedor-detalhe/fornecedor-detalhe';

@IonicPage()
@Component({
  selector: 'page-oficinas-list',
  templateUrl: 'oficinas-list.html',
})
export class OficinasListPage {
  private oficinas: any;
  private loading = null;
  private fornecedores: any;
  public idServico: number;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private fornecedorService: FornecedorService,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.idServico = navParams.get('idServico');
  }

  ngOnInit() {
    this.findOficinasList();
  }

  ionViewDidLoad() {
  }

  findOficinasList() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.fornecedorService
    .findFornecedorPorRaio(this.idServico)
    .then((dados) => {
    this.fornecedores = dados;

    console.log(this.fornecedores);

    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  mostrarDetalhesFornecedor(idFornecedor) {
    this.navCtrl.push(FornecedorDetalhePage, {
      idFornecedor: idFornecedor
    })
  }
}
