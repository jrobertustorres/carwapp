import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//PAGES
import { ServicosListPage } from './../servicos-list/servicos-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
  }

  openServicosList() {
    this.navCtrl.push(ServicosListPage);
  }

}
