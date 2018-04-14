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
    
        this.oficinas = [
          'Oficina 1',
          'Oficina 2',
          'Oficina 3',
          'Oficina 4',
          'Oficina 5'
      ];
      }

}
