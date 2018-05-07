import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { Storage } from '@ionic/storage';

//PAGES
import { MenuPage } from '../pages/menu/menu';

@Component({
  template: '<ion-nav #baseNav></ion-nav>'
})

export class MyApp {
  @ViewChild('baseNav') nav: Nav;
  rootPage:any;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              private appVersion: AppVersion,
              public menuCtrl: MenuController) {

    this.initializeApp();

    // NÃO PRECISA COLOCAR NO STORAGE. BASTA PEGAR DIRETO E JOGAR NUMA VARIÁVEL
    // VER CONFIGURACOES.TS DO JOYBEES CLIENTE
    
    // if (this.platform.is('cordova')) {
    //   this._storage.set(Constants.APP_NAME, this.appVersion.getAppName());
    //   this._storage.set(Constants.VERSION_CODE, this.appVersion.getVersionCode());
    //   this._storage.set(Constants.VERSION_NUMBER, this.appVersion.getVersionNumber());
    // }
    
    // this._storage.get(Constants.APP_NAME).then((appName) => {
    //   console.log(appName);
    // });
    // this._storage.get(Constants.APP_NAME).then((versionCode) => {
    //   console.log(versionCode);
    // });
    // this._storage.get(Constants.APP_NAME).then((versionNumber) => {
    //   console.log(versionNumber);
    // });
    
  }

  ngOnInit() {
    this.nav.push(MenuPage, { animate: false });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // aqui checamos a conexão ao entrar no app
      // this.checkNetwork();
      // abaixo verificamos se a intenet cair depois que o cliente já entrou no app
      // this.network.onDisconnect().subscribe(() => {
      //   let alertDisconect = this.alertCtrl.create({
      //     title: 'Conexão com a internet',
      //     subTitle: 'Não foi encontrada nenhuma conexão com a internet',
      //     buttons: [{
      //        text: 'Ok',
      //        handler: () => {
      //            this.platform.exitApp();
      //           }
      //        }]
      //      });
      //      alertDisconect.present();
      // });
    });
  }

  // checkNetwork() {
  //   if(this.network.type === 'none') {
  //     let alert = this.alertCtrl.create({
  //     title: 'Conexão com a internet',
  //     subTitle: 'Não foi encontrada nenhuma conexão com a internet',
  //     buttons: [{
  //        text: 'Ok',
  //        handler: () => {
  //            this.platform.exitApp();
  //           }
  //        }]
  //      });
  //    alert.present();
  //   }
  // }


}
