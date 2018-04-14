import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

//ENTITYS
import { VeiculoEntity } from '../../model/veiculo-entity';

//PAGES
import { VeiculosListPage } from './../veiculos-list/veiculos-list';

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
  public idVeiculo: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
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

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Veículo atualizado!',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
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

        if(!this.idVeiculo){
          this.insereVeiculo();
        }
        else if(this.idVeiculo) {
          this.editaVeiculo();
        }

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

  insereVeiculo() {
    this.veiculoService
    .adicionaVeiculo(this.veiculoForm.value)
    .then((veiculoEntityResult: VeiculoEntity) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(VeiculosListPage);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  editaVeiculo() {
    this.veiculoService
    .atualizaVeiculo(this.veiculoEntity)
    .then((veiculoEntityResult: VeiculoEntity) => {
      this.loading.dismiss();
      this.presentToast();
      setTimeout(() => {
        this.navCtrl.setRoot(VeiculosListPage);
      }, 3000);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });

  }

}
