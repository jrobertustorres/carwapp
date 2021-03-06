import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, Select } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

//ENTITYS
import { VeiculoEntity } from '../../model/veiculo-entity';

//PAGES
import { VeiculosListPage } from './../veiculos-list/veiculos-list';
import { ModalMarcaVeiculoPage } from '../modal-marca-veiculo/modal-marca-veiculo';

@IonicPage()
@Component({
  selector: 'page-veiculo',
  templateUrl: 'veiculo.html',
})
export class VeiculoPage {
  @ViewChild('select') select:Select; // fecha o select da marca
  private tiposVeiculo = null;
  private isReadOnly = null;
  // private marcasVeiculo = null;
  private modelosVeiculo = null;
  private loading = null;
  public veiculoForm: FormGroup;
  private veiculoEntity: VeiculoEntity;
  public idVeiculo: number;
  public placa: string;
  private toastMessage: string;
  public idMarca: string;
  public marca: string;
  // private showModelo: boolean = false;
  public dadosMarca = {'idMarca': this.idMarca, 'marca': this.marca};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              public modalCtrl: ModalController,
              private veiculoService: VeiculoService) {

    this.veiculoEntity = new VeiculoEntity();
    this.idVeiculo = navParams.get('idVeiculo');
    this.placa = navParams.get('placa');

  }

  ngOnInit() {

    this.findTiposVeiculo();

    this.veiculoForm = this.formBuilder.group({
      'idTipoVeiculo': ['', Validators.required],
      'idMarca': [''],
      // 'idMarca': ['', Validators.required],
      'idModelo': ['', Validators.required],
      'placa': ['', [Validators.required, Validators.maxLength(10)]],
      // 'frota': ['', Validators.maxLength(50)],
      'cor': ['', [Validators.required, Validators.maxLength(50)]],
      // 'chassi': ['', Validators.maxLength(100)],
      'renavan': ['', [Validators.required, Validators.maxLength(100)]],
      'modeloFabricacao': ['', [Validators.required, Validators.maxLength(4)]],
      'anoFabricacao': ['', [Validators.required, Validators.maxLength(4)]],
    });
    this.veiculoForm.controls.idModelo.disable();

    if(this.idVeiculo) {
      this.isReadOnly = true;
    } else {
      this.isReadOnly = false;
    }
    
  }

  ionViewDidLoad() {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.toastMessage,
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
      content: 'Aguarde...',
      dismissOnPageChange: true
    });
    this.loading.present();
    this.veiculoService
    .findTipoVeiculo()
    .then((dados) => {
    this.tiposVeiculo = dados;

    // this.findMarcaVeiculo();
      if (this.idVeiculo) {
        this.getDetalheVeiculo();
      } else {
        // this.loading.dismiss();
      }
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  // findMarcaVeiculo() {
  //   this.veiculoService
  //   .findListMarcaVeiculo()
  //   .then((dados) => {
  //   this.marcasVeiculo = dados;

  //     if (this.idVeiculo) {
  //       this.getDetalheVeiculo();
  //     } else {
  //       this.loading.dismiss();
  //     }
  //   }).catch(err => {
  //     this.loading.dismiss();
  //     this.alertCtrl.create({
  //       subTitle: err.message,
  //       buttons: ['OK']
  //     }).present();
  //   });
  // }

  findListModeloVeiculo(idMarca) {
    this.loading = this.loadingCtrl.create({
      content: 'Buscando modelos...',
      dismissOnPageChange: true
    });
    this.loading.present();

    this.veiculoService
    .findListModeloVeiculoByMarca(idMarca)
    .then((dados) => {
    this.modelosVeiculo = dados;
    this.veiculoForm.controls.idModelo.enable();
    // this.loading.dismiss();
    }).catch(err => {
      // this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  submeterDadosVeiculo() {
    try {
      
      if(this.idMarca) {
        this.veiculoForm.value.idMarca = this.idMarca.toString();
      } else {
        this.veiculoForm.value.idMarca = undefined;
      }

      if (this.veiculoForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...',
          dismissOnPageChange: true
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
      // this.loading.dismiss();
      this.loading ? this.loading.dismiss() : '';
      this.toastMessage = 'Seu ve??culo foi cadastrado!';
      this.presentToast();
      setTimeout(() => {
        this.navCtrl.setRoot(VeiculosListPage);
      }, 3000);
    }, (err) => {
      this.loading ? this.loading.dismiss() : '';
      // this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  editaVeiculo() {
    this.veiculoService
    .alteraVeiculo(this.veiculoEntity)
    .then((veiculoEntityResult: VeiculoEntity) => {
      // this.loading.dismiss();
      this.loading ? this.loading.dismiss() : '';
      this.toastMessage = 'Seu ve??culo foi atualizado!';
      this.presentToast();
      setTimeout(() => {
        this.navCtrl.setRoot(VeiculosListPage);
      }, 3000);
    }, (err) => {
      this.loading ? this.loading.dismiss() : '';
      // this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });

  }

  getDetalheVeiculo() {
    try {
      this.veiculoEntity = new VeiculoEntity();
      this.veiculoEntity.idVeiculo = this.idVeiculo;

      this.veiculoService.detalheVeiculosCliente(this.veiculoEntity)
      .then((veiculoEntityResult: VeiculoEntity) => {
        this.veiculoEntity = veiculoEntityResult;
        this.dadosMarca.marca = this.veiculoEntity.nomeMarca;

        // this.loading.dismiss();
        // this.loading ? this.loading.dismiss() : '';
        this.findListModeloVeiculo(veiculoEntityResult.idMarca);

    }, (err) => {
      // this.loading.dismiss();
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

  showModalMarca(){
    let modal = this.modalCtrl.create(ModalMarcaVeiculoPage);
    // this.select.close(); // fecha o select da marca

    modal.onDidDismiss((data) => {
      if (data) {
        this.idMarca = data.idMarca;
        this.dadosMarca = data;
        this.findListModeloVeiculo(data.idMarca);
      }
    });

    modal.present();
  }

}
