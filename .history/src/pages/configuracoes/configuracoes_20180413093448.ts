import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
// import { EmailComposer } from '@ionic-native/email-composer';
// import { AppVersion } from '@ionic-native/app-version';
// import { Device } from '@ionic-native/device';
// import { Constants } from '../../app/constants';

// PAGES
import { ModalTermosPage } from '../modal-termos/modal-termos';
import { ModalPoliticaPrivacidadePage } from '../modal-politica-privacidade/modal-politica-privacidade';
import { MeusDadosPage } from '../meus-dados/meus-dados';
import { MinhaSenhaPage } from './../minha-senha/minha-senha';

// @IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage implements OnInit {
  // private messagePresentToast: string;
  // private socialSharingTitle: string;
  // private erroAppSubject: string;
  // private erroAppBody: string;
  // private infoSuporte: string;
  // private loading = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {

  }

  ngOnInit() {
  }

  ionViewDidLoad() {
  }

  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: this.messagePresentToast,
  //     duration: 3000,
  //     position: 'bottom',
  //     cssClass: "toast-success"
  //   });

  //   toast.onDidDismiss(() => {
  //   });

  //   toast.present();
  // }

  openModalTermos(){
    let modal = this.modalCtrl.create(ModalTermosPage);
    modal.present();
  }

  openModalPolitica(){
    let modal = this.modalCtrl.create(ModalPoliticaPrivacidadePage);
    modal.present();
  }

  // sendEmailBug() {
  //   this.emailComposer.isAvailable().then((available: boolean) =>{
  //     if(available) {
  //     }
  //    });
     
  //    let email = {
  //      to: 'diretoria@logiic.com.br',
  //      cc: ['jose@logiic.com.br', 'bruno@logiic.com.br'],
  //      subject: this.erroAppSubject,
  //      body: '<p><h1>'+ this.erroAppBody +'</h1></p>' +
  //      '<h1>'+ this.infoSuporte +'</h1>'+
  //      '<h1>JoyBees v'+ this.appVersion.getVersionCode() +'</h1>' +
  //      '<h1>'+ this.device.model +'</h1>' +
  //      '<h1>'+ this.device.platform +' '+ this.device.version +'</h1>' +
  //      '<h1>----------------------</h1>',
  //      isHtml: true
  //    };

  //    this.emailComposer.open(email);
  // }

  // meusDados() {
  //   this.navCtrl.push(MeusDadosPage);
  // }

  minhaSenha() {
    this.navCtrl.push(MinhaSenhaPage);
  }

  meusDados() {
    this.navCtrl.push(MeusDadosPage);
  }

}
