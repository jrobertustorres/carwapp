import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { Network } from '@ionic-native/network';
import { Constants } from '../app/constants';
import { Push, PushObject, PushOptions} from '@ionic-native/push';

//PAGES
import { MenuPage } from '../pages/menu/menu';
import { OrcamentosListPage } from '../pages/orcamentos-list/orcamentos-list';

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
              private network: Network,
              public push: Push,
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
      this.initPushNotification();
      // this.pushsetup();
      this.splashScreen.hide();
      // aqui checamos a conexão ao entrar no app
      this.checkNetwork();
      // abaixo verificamos se a intenet cair depois que o cliente já entrou no app
      this.network.onDisconnect().subscribe(() => {
        this.checkNetwork();
        // let alertDisconect = this.alertCtrl.create({
        //   title: 'Conexão com a internet',
        //   subTitle: 'Não foi encontrada nenhuma conexão com a internet',
        //   buttons: [{
        //      text: 'Ok',
        //      handler: () => {
        //          this.platform.exitApp();
        //         }
        //      }]
        //    });
        //    alertDisconect.present();
      });
    });
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '577705174214',
        sound: 'true',
        'icon': 'icon'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      localStorage.setItem(Constants.TOKEN_PUSH, data.registrationId);
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'Nova notificação',
          message: data.message,
          buttons: [{
            text: 'IGNORAR',
            role: 'cancel'
          }, {
            text: 'VER',
            handler: () => {
              this.nav.push(OrcamentosListPage);
              //TODO: Your logic here
              // this.nav.push(DetailsPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        // this.nav.push(DetailsPage, { message: data.message });
        this.nav.push(OrcamentosListPage);
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }

  checkNetwork() {
    if(this.network.type === 'none') {
      let alert = this.alertCtrl.create({
      title: 'Conexão com a internet',
      subTitle: 'Não foi encontrada nenhuma conexão com a internet',
      buttons: [{
         text: 'Ok',
         handler: () => {
             this.platform.exitApp();
            }
         }]
       });
     alert.present();
    }
  }

  // pushsetup() {
  //   console.log('dentro do setup');
  //   const options: PushOptions = {
  //    android: {
  //        senderID: '577705174214'
  //    },
  //    ios: {
  //        alert: 'true',
  //        badge: true,
  //        sound: 'false'
  //    },
  //    windows: {}
  // };

  // const pushObject: PushObject = this.push.init(options);

  // pushObject.on('notification').subscribe((notification: any) => {
  //   if (notification.additionalData.foreground) {
  //     let youralert = this.alertCtrl.create({
  //       title: 'New Push notification',
  //       message: notification.message
  //     });
  //     youralert.present();
  //   }
  // });

  // pushObject.on('registration').subscribe((registration: any) => {
  //   console.log('dentro do registration');
  //   console.log(registration);
  //   // localStorage.setItem('tokenPush',data.registrationId);
  // });

  // pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  // }

}
