import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Geolocation } from '@ionic-native/geolocation';

import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

// SERVICES
import { EstadosService } from '../../providers/estados-service';
import { CidadesService } from '../../providers/cidades-service';

//ENTITYS
import { FornecedorEntity } from '../../model/fornecedor-entity';

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
  // private statusGpsLigado = false;
  private fornecedorEntity: FornecedorEntity;

  constructor(public navCtrl: NavController,
    private estadosService: EstadosService,
    private cidadesService: CidadesService,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private geolocation: Geolocation,
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
    console.log('dentro do submeter filtro');

    if(this.filtroForm.valid) {
      this.viewCtrl.dismiss({
      filter: this.filtroForm.value
    });

    } else if(this.estadoDisabled == false) { // aqui verificamos se o usuáro escolheu o estado
      Object.keys(this.filtroForm.controls).forEach(campo => {
        const controle = this.filtroForm.get(campo);
        controle.markAsTouched();
      })
    } else if (this.estadoDisabled == true) {
      console.log('NAO FAZ NADA');
      this.getGpsStatus();
    } else {
      console.log('aqui dentro do else');
      this.viewCtrl.dismiss({
        filter: this.filtroForm.value
      });
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
        console.log('linha 139 modal');
        console.log(state);
        if (state == true) {
          // this.statusGpsLigado = true;
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
    this.geolocation.getCurrentPosition().then((resp) => {
      this.fornecedorEntity = new FornecedorEntity();
      localStorage.setItem('latitude', JSON.stringify(resp.coords.latitude));
      localStorage.setItem('longitude', JSON.stringify(resp.coords.longitude));

      this.fornecedorEntity.latitude = resp.coords.latitude;
      this.fornecedorEntity.longitude = resp.coords.longitude;

      this.submeterTipoFiltroGps(this.fornecedorEntity);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
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