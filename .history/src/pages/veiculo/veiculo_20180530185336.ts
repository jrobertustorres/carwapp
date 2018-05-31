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
  private marcasVeiculo = null;
  private modelosVeiculo = null;
  private loading = null;
  public veiculoForm: FormGroup;
  private veiculoEntity: VeiculoEntity;
  public idVeiculo: number;
  public placa: string;
  private toastMessage: string;
  public marca: string;
  public dadosMarca = {};

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
    // this.idCliente = localStorage.getItem('clienteLogado');
    this.placa = navParams.get('placa');

  }

  ngOnInit() {

    this.findTiposVeiculo();

    this.veiculoForm = this.formBuilder.group({
      'idTipoVeiculo': ['', Validators.required],
      'idMarca': ['', Validators.required],
      'idModelo': ['', Validators.required],
      'placa': ['', [Validators.required, Validators.maxLength(10)]],
      // 'frota': ['', Validators.maxLength(50)],
      'cor': ['', [Validators.required, Validators.maxLength(50)]],
      // 'chassi': ['', Validators.maxLength(100)],
      'renavan': ['', [Validators.required, Validators.maxLength(100)]],
      'modeloFabricacao': ['', [Validators.required, Validators.maxLength(4)]],
      'anoFabricacao': ['', [Validators.required, Validators.maxLength(4)]],
    });
    // this.veiculoForm.controls.idMarca.disable();
    
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
      content: 'Aguarde...'
    });
    this.loading.present();
    this.veiculoService
    .findTipoVeiculo()
    .then((dados) => {
    this.tiposVeiculo = dados;
    // this.findMarcaVeiculo();
    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  findMarcaVeiculo() {
    this.veiculoService
    .findListMarcaVeiculo()
    .then((dados) => {
    this.marcasVeiculo = dados;

      if (this.idVeiculo) {
        this.getDetalheVeiculo();
      } else {
        this.loading.dismiss();
      }
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  findListModeloVeiculo(idMarca) {
    this.loading = this.loadingCtrl.create({
      content: 'Buscando modelos...',
    });
    this.loading.present();

    this.veiculoService
    .findListModeloVeiculoByMarca(idMarca)
    .then((dados) => {
    this.modelosVeiculo = dados;
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
          content: 'Aguarde...',
          // dismissOnPageChange: true
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
      this.toastMessage = 'Seu veículo foi cadastrado!';
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

  editaVeiculo() {
    this.veiculoService
    .alteraVeiculo(this.veiculoEntity)
    .then((veiculoEntityResult: VeiculoEntity) => {
      this.loading.dismiss();
      this.toastMessage = 'Seu veículo foi atualizado!';
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

  getDetalheVeiculo() {
    try {
      this.veiculoEntity = new VeiculoEntity();
      this.veiculoEntity.idVeiculo = this.idVeiculo;

      this.veiculoService.detalheVeiculosCliente(this.veiculoEntity)
      .then((veiculoEntityResult: VeiculoEntity) => {
        this.veiculoEntity = veiculoEntityResult;

        this.loading.dismiss();
        this.findListModeloVeiculo(veiculoEntityResult.idMarca);

    }, (err) => {
      this.loading.dismiss();
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
        console.log(data);
        // this.idMarca = data.idMarca;
        this.marca = data.marca;
        this.dadosMarca = data;
        console.log(this.dadosMarca);
        // let idMarca = data.idMarca;
        // let marca = data.marca;
        // console.log(marca);
        this.findListModeloVeiculo(data.idMarca);
      }
    });

    modal.present();
  }

  // removerVeiculoConfirm(idVeiculo) {
  //   let confirm = this.alertCtrl.create({
  //     title: 'Remover veículo',
  //     message: 'Deseja remover este veículo?',
  //     buttons: [
  //       {
  //         text: 'CANCELAR',
  //         handler: () => {
  //         }
  //       },
  //       {
  //         text: 'CONFIRMAR',
  //         handler: () => {
  //           this.removerVeiculo(idVeiculo);
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  // removerVeiculo(idVeiculo) {
  //   this.veiculoEntity.idVeiculo = idVeiculo;
  //   this.veiculoService
  //   .removerVeiculo(this.veiculoEntity)
  //   .then((veiculoEntityResult: VeiculoEntity) => {
  //     this.loading.dismiss();
  //     this.toastMessage = 'O veículo foi removido!';
  //     this.presentToast();
  //     setTimeout(() => {
  //       this.navCtrl.setRoot(VeiculosListPage);
  //     }, 3000);
  //   }, (err) => {
  //     this.loading.dismiss();
  //     this.alertCtrl.create({
  //       subTitle: err.message,
  //       buttons: ['OK']
  //     }).present();
  //   });
  // }

}
