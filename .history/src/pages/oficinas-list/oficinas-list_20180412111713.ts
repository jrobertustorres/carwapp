import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-oficinas-list',
  templateUrl: 'oficinas-list.html',
})
export class OficinasListPage {
  private oficinas: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ngOnInit() {
    this.findOficinasList();
  }

  ionViewDidLoad() {
  }

  findOficinasList() {
    
        this.oficinas = [
          {
              nome: 'Oficina 1',
              endereco: 'Avenida 1'
          },
          {
              nome: 'Oficina 2',
              endereco: 'Avenida 2'
          },
          {
              nome: 'Oficina 3',
              endereco: 'Avenida 3'
          },
          {
              nome: 'Oficina 4',
              endereco: 'Avenida 4'
          },
          {
              nome: 'Oficina 5',
              endereco: 'Avenida 5'
          },
          {
              nome: 'Oficina 6',
              endereco: 'Avenida 6'
          }
      ];
    
      }

}
