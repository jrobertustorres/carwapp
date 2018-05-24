import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectSearchable } from 'ionic-select-searchable';

// import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

// SERVICES
import { EstadosService } from '../../providers/estados-service';
import { CidadesService } from '../../providers/cidades-service';

//ENTITYS
import { FornecedorEntity } from '../../model/fornecedor-entity';

// class Cidades {
//   public idCidade: number;
//   public cidade: string;
// }

@IonicPage()
@Component({
  selector: 'page-modal-tipo-filtro-servico',
  templateUrl: 'modal-tipo-filtro-servico.html',
})
export class ModalTipoFiltroServicoPage {
  private estadoDisabled: boolean;
  private estados = [];
  private cidades = [];
  private loadingCidades = null;
  public filtroForm: FormGroup;
  private loading = null;
  private fornecedorEntity: FornecedorEntity;

  // cidades: Cidades[];
  // cidade: Cidades;

  constructor(public navCtrl: NavController,
    private estadosService: EstadosService,
    private cidadesService: CidadesService,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    // private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
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
        content: 'Buscando cidades...',
        dismissOnPageChange: true
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
    if(this.filtroForm.valid) {
      this.viewCtrl.dismiss({
      filter: this.filtroForm.value
    });

    } else if(this.estadoDisabled == false) { // aqui verificamos se o usuáro escolheu o estado
      Object.keys(this.filtroForm.controls).forEach(campo => {
        const controle = this.filtroForm.get(campo);
        controle.markAsTouched();
      })
    } else {
      // this.getLocation(); // RETIRAR ISSO - ESSA LINHA É PARA TESTES NO BROWSER
      this.getGpsStatus(); // DESCOMENTAR AQUI PARA RODAR NO CELULAR
    }

  }

  submeterTipoFiltroGps(formValue) {
    this.viewCtrl.dismiss({
      filter: formValue
    });
  }

  getGpsStatus() {
    let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
      let errorCallback = (e) => console.error(e);
      
      this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
      
      // only android
      this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);

      this.diagnostic.isLocationEnabled()
      .then((state) => {
        if (state == true) {
          this.getLocation();
        } else {
          this.locationAccuracy.canRequest().then((canRequest: boolean) => {
            if(canRequest) {
              // the accuracy option will be ignored by iOS
              this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
              .then(
                () => this.getLocation(),
                error => this.showLocationText()
              );
            }
          
          });
        }
      }).catch(e => console.error(e));
  }

  getLocation() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...',
      dismissOnPageChange: true
    });
    this.loading.present();

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
};

this.backgroundGeolocation.configure(config)
.subscribe((location: BackgroundGeolocationResponse) => {

console.log(location);

// IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
// and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
// IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
this.backgroundGeolocation.finish(); // FOR IOS ONLY

});

    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.fornecedorEntity = new FornecedorEntity();
    //   localStorage.setItem('latitude', JSON.stringify(resp.coords.latitude));
    //   localStorage.setItem('longitude', JSON.stringify(resp.coords.longitude));

    //   this.fornecedorEntity.latitude = resp.coords.latitude;
    //   this.fornecedorEntity.longitude = resp.coords.longitude;
      
    //   this.submeterTipoFiltroGps(this.fornecedorEntity);
    //   this.loading.dismiss();
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
  }

  showLocationText() {
    let prompt = this.alertCtrl.create({
      title: 'Localização',
      message: "Não foi possível obter a localização atual!",
      buttons: [
        {
          text: 'OK!',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();
  }

}
