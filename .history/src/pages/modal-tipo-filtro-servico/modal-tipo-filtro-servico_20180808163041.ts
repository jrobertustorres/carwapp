import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectSearchable } from 'ionic-select-searchable';

import { Geolocation } from '@ionic-native/geolocation';

import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

// SERVICES
import { EstadosService } from '../../providers/estados-service';
import { CidadesService } from '../../providers/cidades-service';

//ENTITYS
import { FornecedorEntity } from '../../model/fornecedor-entity';

//PAGES
import { ModalCidadesPage } from '../modal-cidades/modal-cidades';

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

  public idCidade: string;
  public cidade: string;
  public dadosCidades = {'idCidade': this.idCidade, 'cidade': this.cidade};
  idEstado: number;

  constructor(public navCtrl: NavController,
              private estadosService: EstadosService,
              private cidadesService: CidadesService,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private geolocation: Geolocation,
              private diagnostic: Diagnostic,
              public modalCtrl: ModalController,
              private locationAccuracy: LocationAccuracy,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.estadoDisabled = true;
    this.filtroForm = this.formBuilder.group({
      'idEstado': ['', Validators.required],
      'idCidade': [''],
      // 'idCidade': ['', Validators.required],
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

  submeterTipoFiltro() {

    if(this.idCidade) {
      this.filtroForm.value.idCidade = this.idCidade.toString();
    } else {
      // this.filtroForm.value.idCidade = undefined;
      this.idCidade = undefined;
    }

    if(this.filtroForm.valid && this.idCidade != undefined) {
    // if(this.filtroForm.valid) {
      this.viewCtrl.dismiss({
      filter: this.filtroForm.value
    });

    } else if(this.estadoDisabled == false) { // aqui verificamos se o usuáro escolheu o estado
      Object.keys(this.filtroForm.controls).forEach(campo => {
        const controle = this.filtroForm.get(campo);
        controle.markAsTouched();
      })
    } else {
      this.getLocation(); // RETIRAR ISSO - ESSA LINHA É PARA TESTES NO BROWSER
      // this.getGpsStatus(); // DESCOMENTAR AQUI PARA RODAR NO CELULAR
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

    this.geolocation.getCurrentPosition().then((resp) => {
      this.fornecedorEntity = new FornecedorEntity();
      localStorage.setItem('latitude', JSON.stringify(resp.coords.latitude));
      localStorage.setItem('longitude', JSON.stringify(resp.coords.longitude));

      this.fornecedorEntity.latitude = resp.coords.latitude;
      this.fornecedorEntity.longitude = resp.coords.longitude;
      
      this.submeterTipoFiltroGps(this.fornecedorEntity);
      // this.loading.dismiss();
    }).catch((error) => {
      // this.loading.dismiss();
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

  getIdEstado(idEstado: any) {
    this.idEstado = idEstado;
  }

  showModalCidades(){
    let modal = this.modalCtrl.create(ModalCidadesPage, {idEstado: this.idEstado});

    modal.onDidDismiss((data) => {
      if (data) {
        this.idCidade = data.idCidade;
        this.dadosCidades = data;
      }
    });

    modal.present();
  }

}
