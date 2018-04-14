import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//PAGES
import { TiposServicoListPage } from './../tipos-servico-list/tipos-servico-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
  }

  openTiposServicoList() {
    this.navCtrl.push(TiposServicoListPage);
  }

}
