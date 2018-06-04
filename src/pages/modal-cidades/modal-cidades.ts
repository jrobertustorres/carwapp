import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';

//SEVICES
import { CidadesService } from '../../providers/cidades-service';

@IonicPage()
@Component({
  selector: 'page-modal-cidades',
  templateUrl: 'modal-cidades.html',
})
export class ModalCidadesPage {
  private loading = null;
  public idEstado: number;
  private cidades = [];
  private aux = [];

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private cidadesService: CidadesService,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.idEstado = navParams.get('idEstado');
  }

  ngOnInit() {
    this.getCidadesByEstado(this.idEstado);
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getItems(searchbar) {
    let q = searchbar.srcElement.value;
    if (!q) {
      this.getCidadesByEstado(this.idEstado);
    }
    this.aux = this.aux.length == 0 ? this.cidades : this.aux; 

    if(this.cidades.length == 0) {
      this.cidades = this.aux;
    }
  
    this.cidades = this.cidades.filter((v) => {
      if(v.cidade && q) {
        if (v.cidade.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  // getItems(searchbar) {
  //   let q = searchbar.srcElement.value;
  //   if (!q) {
  //     this.getCidadesByEstado(this.idEstado);
  //   }
  
  //   this.cidades = this.cidades.filter((v) => {
  //     if(v.cidade && q) {
  //       if (v.cidade.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //         return true;
  //       }
  //       return false;
  //     }
  //   });
  // }

  getCidadesByEstado(idEstado: any) {
    try {

      this.loading = this.loadingCtrl.create({
        content: 'Buscando cidades...'
      });
      this.loading.present();

      this.cidadesService
        .getCidades(idEstado)
        .then((listCidadesResult) => {
          this.cidades = listCidadesResult;

          this.loading.dismiss();
        })
        .catch(err => {
          this.loading.dismiss();
          this.alertCtrl.create({
            subTitle: err.message,
            buttons: ['OK']
          }).present();
        });
    } catch (err) {
      if (err instanceof RangeError) {
      }
      console.log(err);
    }
  }

  setCidade(idCidade, cidade) {
    this.viewCtrl.dismiss({
      idCidade: idCidade, cidade: cidade
    });
  }

}
