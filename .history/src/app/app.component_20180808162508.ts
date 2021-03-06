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
  }

  ngOnInit() {
    this.nav.push(MenuPage, { animate: false });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(()=>this.myHandlerFunction());
      if (this.platform.is('cordova')) {
        this.appVersion.getVersionNumber().then((version) => {
          localStorage.setItem(Constants.VERSION_NUMBER, version);
        })
      }
      this.statusBar.styleDefault();
      this.initPushNotification();
      this.splashScreen.hide();
      // aqui checamos a conexão ao entrar no app
      this.checkNetwork();
      // abaixo verificamos se a intenet cair depois que o cliente já entrou no app
      this.network.onDisconnect().subscribe(() => {
        this.checkNetwork();
      });
    });
  }

  myHandlerFunction(){
    //desabilitando o botão de voltar do android
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '577705174214',
        sound   : 'true',
        vibrate : true
        // icon    : 'icon'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      localStorage.setItem(Constants.TOKEN_PUSH, data.registrationId);
    });

    pushObject.on('notification').subscribe((data: any) => {
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

}
