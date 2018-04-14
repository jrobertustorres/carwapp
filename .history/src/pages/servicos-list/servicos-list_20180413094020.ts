import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//PAGES
import { OficinasListPage } from './../oficinas-list/oficinas-list';

@IonicPage()
@Component({
  selector: 'page-servicos-list',
  templateUrl: 'servicos-list.html',
})
export class ServicosListPage {
  private servicos: any;
  public idTipoServico: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {

    this.idTipoServico = navParams.get('idTipoServico');
  }

  ngOnInit() {
    this.findServicosList();
  }

  ionViewDidLoad() {
  }

  findServicosList() {

  //   this.servicos = [
  //     {
  //         nome: 'Alinhamento',
  //         icon: 'Alinhamento.svg'
  //     },
  //     {
  //         nome: 'Balanceamento',
  //         icon: 'Balanceamento'
  //     },
  //     {
  //         nome: 'Bateria',
  //         icon: 'Bateria',
  //     },
  //     {
  //         nome: 'Correa Dentada',
  //         icon: 'Bateria',
  //     },
  //     {
  //         nome: 'Embreagem',
  //         icon: 'Bateria',
  //     },
  //     {
  //         nome: 'Escapamento',
  //         icon: 'Bateria',
  //     }
  // ];

    this.servicos = [
      'Alinhamento',
      'Balanceamento',
      'Bateria',
      'Correa Dentada',
      'Embreagem',
      'Escapamento',
      'Extintor'
  ];
  }

  openOficinasList() {
    this.navCtrl.push(OficinasListPage);
  }

}
