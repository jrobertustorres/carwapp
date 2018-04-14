import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

//ENTITYS
import { VeiculoEntity } from '../../model/veiculo-entity';

@IonicPage()
@Component({
  selector: 'page-veiculo',
  templateUrl: 'veiculo.html',
})
export class VeiculoPage {
  private tiposVeiculo = null;
  private marcasVeiculo = null;
  private modelosVeiculo = null;
  private loading = null;
  public veiculoForm: FormGroup;
  private veiculoEntity: VeiculoEntity;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private veiculoService: VeiculoService) {

    this.veiculoEntity = new VeiculoEntity();
    this.idVeiculo = navParams.get('idVeiculo');

  }

  ngOnInit() {

    this.findTiposVeiculo();

    this.veiculoForm = this.formBuilder.group({
      'idTipoVeiculo': ['', Validators.required],
      'idMarca': ['', Validators.required],
      'idModelo': ['', Validators.required],
      'placa': ['', [Validators.required, Validators.maxLength(10)]],
      'frota': ['', [Validators.required, Validators.maxLength(50)]],
      'cor': ['', [Validators.required, Validators.maxLength(50)]],
      'chassi': ['', [Validators.required, Validators.maxLength(100)]],
      'renavan': ['', [Validators.required, Validators.maxLength(100)]],
      'modeloFabricacao': ['', [Validators.required, Validators.maxLength(4)]],
      'anoFabricacao': ['', [Validators.required, Validators.maxLength(4)]],
    });

    
  }

  ionViewDidLoad() {
  }

  findTiposVeiculo() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
    this.veiculoService
    .findTipoVeiculo()
    .then((dados) => {
    this.tiposVeiculo = dados;
    this.findMarcaVeiculo();
    // this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  findMarcaVeiculo() {
    // this.loading = this.loadingCtrl.create({
    //   content: 'Aguarde...'
    // });
    // this.loading.present();
    this.veiculoService
    .findListMarcaVeiculo()
    .then((dados) => {
    this.marcasVeiculo = dados;
    this.findListModeloVeiculo();
    console.log(this.marcasVeiculo);
    // this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  findListModeloVeiculo() {
    // this.loading = this.loadingCtrl.create({
    //   content: 'Aguarde...'
    // });
    // this.loading.present();
    this.veiculoService
    .findListModeloVeiculo()
    .then((dados) => {
    this.modelosVeiculo = dados;
    console.log(this.modelosVeiculo);
    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  submeterDadosVeiculo() {
    try {

      if (this.veiculoForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...'
        });
        this.loading.present();

        this._storage.get(Constants.ID_USUARIO).then((idUsuario) => {
          if(!idUsuario){
            this.insereVeiculo();
          }
          else if(idUsuario) {
            this.editaVeiculo();
          }
        });

      } else {
        Object.keys(this.veiculoForm.controls).forEach(campo => {
          const controle = this.veiculoForm.get(campo);
          controle.markAsTouched();
        })
      }
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

}
