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
      'Alinhamento',
      'Balanceamento',
      'Bateria',
      'Correa Dentada',
      'Embreagem',
      'Escapamento',
      'Extintor'
  ];
  }



}
