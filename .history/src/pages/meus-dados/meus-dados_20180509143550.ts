import { Component, OnInit, EventEmitter } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

//UTILITARIOS
import { PasswordValidation } from '../../utilitarios/password-validation';

//ENTITYS
import { UsuarioEntity } from './../../model/usuario-entity';
import { UsuarioDetalheEntity } from './../../model/usuario-detalhe-entity';

//PAGES
import { HomePage } from '../home/home';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';
// import { ModalTermosPage } from '../modal-termos/modal-termos';

// SERVICES
// import { EstadosService } from '../../providers/estados-service';
// import { CidadesService } from '../../providers/cidades-service';
import { UsuarioService } from '../../providers/usuario-service';

// @IonicPage()
@Component({
  selector: 'page-meus-dados',
  templateUrl: 'meus-dados.html',
})
export class MeusDadosPage implements OnInit {

  public dadosUsuarioForm: FormGroup;
  private usuarioDetalheEntity: UsuarioDetalheEntity;
  private usuarioEntity: UsuarioEntity;
  private loading = null;
  private loadingDados = null;
  private isReadOnly = null;
  private isLoggedIn = null;
  public userChangeEvent = new EventEmitter();
  public emailPessoaChangeEvent = new EventEmitter();
  // private loadingCidades = null;
  // private estados = [];
  // private cidades = [];

  // private idUsuario: any;
  // private tokenUsuario: any;
  // private nomePessoa: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              public modalCtrl: ModalController,
              private _storage: Storage) {

    this.usuarioDetalheEntity = new UsuarioDetalheEntity();
    this.usuarioEntity = new UsuarioEntity();
  }

  ngOnInit() {

    this.dadosUsuarioForm = this.formBuilder.group({
      'nomePessoa': ['', [Validators.required, Validators.maxLength(100)]],
      'cpfPessoa': ['', [Validators.required, Validators.maxLength(14)]],
      'emailUsuario': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'telefonePessoa': ['', Validators.maxLength(50)],
      'senhaUsuario': [''],
      'confirmSenha': ['']
      // 'statusAceitoTermoUso': ['false']
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );

    this._storage.get(Constants.ID_USUARIO).then((isLoggedIn) => {
      console.log(isLoggedIn);
      this.isLoggedIn = isLoggedIn;
      if(!isLoggedIn){
        this.isReadOnly = false;
        this.dadosUsuarioForm.get('senhaUsuario').setValidators([Validators.required]);
      } else if(isLoggedIn) {
        this.isReadOnly = true;
        // this.isLoggedIn = isLoggedIn;
        this.callGetDadosUsuario();
      }
    });

    // this.isReadOnly = localStorage.getItem(Constants.ID_USUARIO) ? true : false;
    
    // if (localStorage.getItem(Constants.ID_USUARIO)) {
    //   this.callGetDadosUsuario();
    // } else {
    //   this.dadosUsuarioForm.get('senhaUsuario').setValidators([Validators.required]);
    // }

    // this.estadosService
    //   .getEstados()
    //   .subscribe(dados => {
    //   this.estados = dados;
    // });

  }

  ionViewDidLoad() {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Cadastro atualizado!',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  // getCidadesByEstadoUsuario(idEstado) {
  //   try {
  //     this.loadingCidades = this.loadingCtrl.create({
  //       content: 'Buscando cidades...'
  //     });
  //     this.loadingCidades.present();

  //     this.cidadesService
  //       .getCidades(idEstado)
  //       .then((listCidadesResult) => {
  //         this.cidades = listCidadesResult;
  //         this.loadingCidades.dismiss();
  //       })
  //       .catch(err => {
  //         this.loadingCidades.dismiss();
  //         this.alertCtrl.create({
  //           subTitle: err.message,
  //           buttons: ['OK']
  //         }).present();
  //       });
  //   }catch (err){
  //     if(err instanceof RangeError){
  //     }
  //     console.log(err);
  //   }
  // }

  // openModalTermosCadastro(){
  //   let modal = this.modalCtrl.create(ModalTermosPage);
  //   modal.present();
  // }

  submeterDadosUsuario() {
    try {

      if (this.dadosUsuarioForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...'
        });
        this.loading.present();

        this._storage.get(Constants.ID_USUARIO).then((idUsuario) => {
          if(!idUsuario){
            this.cadastraUsuario();
          }
          else if(idUsuario) {
            this.editaUsuario();
          }
        });

      } else {
        Object.keys(this.dadosUsuarioForm.controls).forEach(campo => {
          const controle = this.dadosUsuarioForm.get(campo);
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

  cadastraUsuario() {
    this.usuarioService
    .cadastraUsuario(this.dadosUsuarioForm.value)
    .then((usuarioEntityResult: UsuarioEntity) => {

      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

  editaUsuario() {
    this.usuarioService
    .atualizaUsuario(this.usuarioDetalheEntity)
    .then((usuarioDetalheEntityResult: UsuarioDetalheEntity) => {
      this.loading.dismiss();
      this.presentToast();
      setTimeout(() => {
        this.navCtrl.setRoot(ConfiguracoesPage);
      }, 3000);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });

  }

  callGetDadosUsuario() {
    try {
      this.loadingDados = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loadingDados.present();

      this.usuarioService
        .getDadosUsuario()
        .then((dadosUsuarioDetalheResult) => {
          this.usuarioDetalheEntity = dadosUsuarioDetalheResult;

          console.log(this.usuarioDetalheEntity);

          this.loadingDados.dismiss();
          // this.getCidadesByEstadoUsuario(dadosUsuarioDetalheResult.idEstado);
        })
        .catch(err => {
          this.loadingDados.dismiss();
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