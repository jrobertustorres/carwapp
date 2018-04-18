import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';

//SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';

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
    console.log(this.idServico);
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

  // findOficinasList() {
    
  //       this.oficinas = [
  //         {
  //             id: '1',
  //             nome: 'Oficina 1',
  //             endereco: 'Avenida 1'
  //           },
  //           {
  //             id: '2',
  //             nome: 'Oficina 2',
  //             endereco: 'Avenida 2'
  //           },
  //           {
  //             id: '3',
  //             nome: 'Oficina 3',
  //             endereco: 'Avenida 3'
  //           },
  //           {
  //             id: '4',
  //             nome: 'Oficina 4',
  //             endereco: 'Avenida 4'
  //           },
  //           {
  //             id: '5',
  //             nome: 'Oficina 5',
  //             endereco: 'Avenida 5'
  //           },
  //           {
  //             id: '6',
  //             nome: 'Oficina 6',
  //             endereco: 'Avenida 6'
  //         }
  //     ];
    
  // }

}
