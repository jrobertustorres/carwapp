import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

// SERVICES
import { EstadosService } from '../../providers/estados-service';
import { CidadesService } from '../../providers/cidades-service';

@IonicPage()
@Component({
  selector: 'page-modal-tipo-filtro-servico',
  templateUrl: 'modal-tipo-filtro-servico.html',
})
export class ModalTipoFiltroServicoPage {
  private estadoDisabled: boolean;
  private estados = [];
  private cidades = [];
  private zone: any;
  private loadingCidades = null;

  constructor(public navCtrl: NavController, 
              private estadosService: EstadosService,
              private cidadesService: CidadesService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.estadoDisabled = true;
  }

  disableEstado(status) {
    this.estadoDisabled = status;
    if (status == false) {
      this.estadosService
      .getEstados()
      .subscribe(dados => {
      this.estados = dados;
      });
    }
  }

  getCidadesByEstado(idEstado: any) {
    console.log(idEstado);
    try {

      this.loadingCidades = this.loadingCtrl.create({
        content: 'Buscando cidades...'
      });
      this.loadingCidades.present();

      this.cidadesService
        .getCidades(idEstado)
        .then((listCidadesResult) => {
          this.cidades = listCidadesResult;
          this.loadingCidades.dismiss();
        })
        .catch(err => {
          this.loadingCidades.dismiss();
          this.alertCtrl.create({
            subTitle: err.message,
            buttons: ['OK']
          }).present();
        });
    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

}
