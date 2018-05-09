import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Geolocation } from '@ionic-native/geolocation';

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
  // private estadoDisabled: boolean = true;
  private estados = [];
  private cidades = [];
  private loadingCidades = null;
  public filtroForm: FormGroup;

  constructor(public navCtrl: NavController,
    private estadosService: EstadosService,
    private cidadesService: CidadesService,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.estadoDisabled = true;
    this.filtroForm = this.formBuilder.group({
      'idEstado': ['', Validators.required],
      'idCidade': ['', Validators.required],
    });
    this.filtroForm.controls.idEstado.disable();
    this.filtroForm.controls.idCidade.disable();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  disableEstado(status) {
    this.estadoDisabled = status;
    if (status == false) {
      this.filtroForm.controls.idEstado.enable();
      this.filtroForm.controls.idCidade.enable();
      this.estadosService
        .getEstados()
        .subscribe(dados => {
          this.estados = dados;
        });
    } else {
      this.filtroForm.controls.idEstado.disable();
      this.filtroForm.controls.idCidade.disable();
    }
  }

  getCidadesByEstado(idEstado: any) {
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
    } catch (err) {
      if (err instanceof RangeError) {
      }
      console.log(err);
    }
  }

  submeterTipoFiltro() {
    console.log(this.filtroForm.value);
    console.log(this.estadoDisabled);

    let disabled = this.filtroForm.controls.idEstado.enable();
    console.log(disabled);

    if(this.estadoDisabled == true) {
      console.log('aaaaa');
    //   this.geolocation.getCurrentPosition().then((resp) => {
    //     console.log(resp.coords.latitude);
    //     console.log(resp.coords.longitude);
    //    }).catch((error) => {
    //      console.log('Error getting location', error);
    //    });
    // } 
    // else {
    // if (this.filtroForm.valid) {
    this.viewCtrl.dismiss({
      filter: this.filtroForm.value
      // filter: this.usuarioDetalheEntity
    });

    } 
    else {
      Object.keys(this.filtroForm.controls).forEach(campo => {
        const controle = this.filtroForm.get(campo);
        controle.markAsTouched();
      })
    }

    // }
  }

}
