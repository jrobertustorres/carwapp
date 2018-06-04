import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private cidadesService: CidadesService,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.idEstado = navParams.get('idEstado');
  }

  ngOnInit() {
    this.getCidadesByEstado(this.idEstado);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCidadesPage');
  }

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

}
