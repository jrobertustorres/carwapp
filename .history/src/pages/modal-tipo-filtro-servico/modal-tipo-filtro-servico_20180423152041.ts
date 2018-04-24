import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

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
      // 'raio': [''],
      'idEstado': ['', {disabled: true}, Validators.required],
      'idCidade': ['', Validators.required],
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
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

  submeterTipoFiltro() {
    console.log(this.filtroForm.value);

    // if(this.estadoDisabled == true) {

    // } 
    // else {
      if (this.filtroForm.valid) {
        this.viewCtrl.dismiss({
          filter: this.filtroForm.value
          // filter: this.usuarioDetalheEntity
        });

      } else {
        Object.keys(this.filtroForm.controls).forEach(campo => {
          const controle = this.filtroForm.get(campo);
          controle.markAsTouched();
        })
      }

    // }
  }

}
