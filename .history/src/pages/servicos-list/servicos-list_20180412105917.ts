import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-servicos-list',
  templateUrl: 'servicos-list.html',
})
export class ServicosListPage {
  private servicos: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ngOnInit() {
    this.findServicosList();
  }

  ionViewDidLoad() {
  }

  findServicosList() {

    this.servicos = [
      {
          nome: 'Alinhamento',
          icon: 'Alinhamento.svg'
          // items: [
          //     {title: 'Task 1', checked: false},
          //     {title: 'Task 2', checked: false},
          //     {title: 'Task 3', checked: false}
          // ]
      },
      {
          nome: 'Balanceamento',
          icon: 'Balanceamento'
          // items: [
          //     {title: 'Task 1', checked: false},
          //     {title: 'Task 2', checked: false},
          //     {title: 'Task 3', checked: false}
          // ]
      },
      {
          nome: 'Bateria',
          icon: 'Bateria',
          // items: [
          //     {title: 'Task 1', checked: false},
          //     {title: 'Task 2', checked: false},
          //     {title: 'Task 3', checked: false}
          // ]
      },
      {
          nome: 'Correa Dentada',
          icon: 'Bateria',
      },
      {
          nome: 'Embreagem',
          icon: 'Bateria',
      },
      {
          nome: 'Escapamento',
          icon: 'Bateria',
      }
  ];

  //   this.servicos = [
  //     'Alinhamento',
  //     'Balanceamento',
  //     'Bateria',
  //     'Correa Dentada',
  //     'Embreagem',
  //     'Escapamento',
  //     'Extintor'
  // ];
  }



}
