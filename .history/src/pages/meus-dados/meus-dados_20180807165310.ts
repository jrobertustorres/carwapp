import { Component, OnInit, EventEmitter } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';
import {MaskUtil} from "../../utilitarios/mask";

//UTILITARIOS
import { PasswordValidation } from '../../utilitarios/password-validation';

//ENTITYS
import { UsuarioEntity } from './../../model/usuario-entity';
import { UsuarioDetalheEntity } from './../../model/usuario-detalhe-entity';

//PAGES
import { HomePage } from '../home/home';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

// SERVICES
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
  private idUsuarioLogado = null;
  public userChangeEvent = new EventEmitter();
  public emailPessoaChangeEvent = new EventEmitter();
  public cpfPessoa: string;
  public telefonePessoa: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private mask: MaskUtil,
              public modalCtrl: ModalController) {

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

    this.idUsuarioLogado = localStorage.getItem(Constants.ID_USUARIO);
    if(!localStorage.getItem(Constants.ID_USUARIO)){
      this.isReadOnly = false;
      this.dadosUsuarioForm.get('senhaUsuario').setValidators([Validators.required]);
    } else if(localStorage.getItem(Constants.ID_USUARIO)) {
      this.isReadOnly = true;
      this.callGetDadosUsuario();
    }
  }

  ionViewDidLoad() {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Cadastro atualizado!',
      duration: 2000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  submeterDadosUsuario() {
    try {

      if (this.dadosUsuarioForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...',
          dismissOnPageChange: true
        });
        this.loading.present();

        // this._storage.get(Constants.ID_USUARIO).then((idUsuario) => {
          if(!localStorage.getItem(Constants.ID_USUARIO)){
            this.cadastraUsuario();
          }
          else if(localStorage.getItem(Constants.ID_USUARIO)) {
            this.editaUsuario();
          }
        // });

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
    this.dadosUsuarioForm.value.cpfPessoa = this.cpfPessoa;
    this.dadosUsuarioForm.value.telefonePessoa = this.telefonePessoa;
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
    this.usuarioDetalheEntity.cpfPessoa = this.cpfPessoa;
    this.usuarioDetalheEntity.telefonePessoa = this.telefonePessoa;
    this.usuarioService
    .atualizaUsuario(this.usuarioDetalheEntity)
    .then((usuarioDetalheEntityResult: UsuarioDetalheEntity) => {
      this.loading.dismiss();
      this.presentToast();
      setTimeout(() => {
        this.navCtrl.setRoot(ConfiguracoesPage);
      }, 2000);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });

  }

  getCampoCpf(v) {
    this.cpfPessoa = this.mask.maskCpfConvert(v);
  }
  
  getCampoTelefone(tel) {
      this.telefonePessoa = this.mask.maskPhoneConverter(tel);
  }

  callGetDadosUsuario() {
    try {
      this.loadingDados = this.loadingCtrl.create({
        content: 'Aguarde...',
        dismissOnPageChange: true
      });
      this.loadingDados.present();

      this.usuarioService
        .getDadosUsuario()
        .then((dadosUsuarioDetalheResult) => {
          this.usuarioDetalheEntity = dadosUsuarioDetalheResult;
          this.getCampoCpf(this.usuarioDetalheEntity.cpfPessoa);
          this.getCampoTelefone(this.usuarioDetalheEntity.telefonePessoa);

          this.loadingDados.dismiss();
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
