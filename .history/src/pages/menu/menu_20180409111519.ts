import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, AlertController, Nav, MenuController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Platform, ActionSheetController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

//ENTITY
import { UsuarioEntity } from '../../model/usuario-entity';

//PAGES
import { HomePage } from '../home/home';
// import { PrincipalPage } from '../principal/principal';
// import { ConfiguracoesPage } from '../configuracoes/configuracoes';

//SERVICES
import { LoginService } from '../../providers/login-service';
import { UsuarioService } from '../../providers/usuario-service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit{
  @ViewChild('content') nav: Nav;
  rootPage:any;
  public nomeFornecedor: string;
  public nomePessoa: string;
  public loginPessoa: string;
  pages: Array<{title: string, component: any, isVisible: boolean, icon: string}>;

  private usuarioEntity: UsuarioEntity;

  private subTitleLogout: string;
  private cancelLogout: string;
  private sairLogout: string;
  private configuracoes: string;
  private minhasVagas: string;
  private loadingText: string;
  private candidaturas: string;
  private loading = null;
  private alterarFoto: string;
  private abrirCamera: string;
  private abrirGaleria: string;
  private cancelar: string;

  cameraData: any;
  photoTaken: boolean;
  cameraUrl: any;
  photoSelected: boolean;

  constructor(public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              private languageProvider: LanguageProvider,
              public loginService: LoginService,
              public usuarioService: UsuarioService,
              public platform: Platform,
              private _storage: Storage,
              public actionSheetCtrl: ActionSheetController) {

      this.usuarioEntity = new UsuarioEntity();

      this.translate = translate;

      try {

        // ERA ASSIM DEPOIS
        this._storage.get(Constants.ID_USUARIO).then((idUsuario) => {
          if(!idUsuario){
            this.rootPage = HomePage;
          }
          else if(idUsuario) {
            // localStorage.setItem(Constants.ID_USUARIO, idUsuario);
            this.callLoginByIdService(idUsuario);
          }
        });

        //ERA ASSIM ANTES
        // if(localStorage.getItem(Constants.ID_USUARIO)!=null) {
        //   this.callLoginByIdService();
        // } else {
        //   this.rootPage = HomePage;
        // }
      }
      catch (err){
        // this.trataExcessao(null);
      }
  }

  ngOnInit() {
    this.constroiMenu();
  }

  ionViewDidLoad() {
  }

  constroiMenu() {
    this.pages = [
      { title: 'Home', component: HomePage, isVisible: true, icon: 'ios-search' },
      { title: 'List', component: ListPage, isVisible: true, icon: 'ios-settings' }
      // { title: this.candidaturas, component: VagasCandidatadasPage, isVisible: true, icon: 'ios-briefcase' },
    ];
    // this.languageProvider.languageChangeEvent.subscribe(selectedLanguage => {
    //   this.selectedLanguage = selectedLanguage;
    //   localStorage.setItem(Constants.IDIOMA_USUARIO, selectedLanguage);
    //   this.getLanguage(); // aqui temos a chamar novamente para funcionar a alteração da linguagem
    // });

    // this.loginService.nomeFornecedorChangeEvent.subscribe(nomeFornecedor => {
    //   this.nomeFornecedor = nomeFornecedor;
    // });
    // this.loginService.userChangeEvent.subscribe(nomePessoa => {
    //   this.nomePessoa = nomePessoa.split(/(\s).+\s/).join("");
    // });
    // this.loginService.emailPessoaChangeEvent.subscribe(login => {
    //   this.loginPessoa = login.split(/(\s).+\s/).join("");
    // });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  callLoginByIdService(idUsuario) {
  
    try {
      this.loading = this.loadingCtrl.create({
        content: this.loadingText
      });
      this.loading.present();

      this.usuarioEntity.idUsuario = idUsuario;
      this.loginService.loginByIdService(this.usuarioEntity)
        .then((usuarioEntityResult: UsuarioEntity) => {
          this.rootPage = PrincipalPage;
          this.loading.dismiss();

      }, (err) => {
        this.alertCtrl.create({
          subTitle: err.message,
          buttons: ['OK']
        }).present();
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
      
  }

  logout() {
    let alert = this.alertCtrl.create({
      subTitle: this.subTitleLogout,
      buttons: [
        {
          text: this.cancelLogout,
          role: 'cancel'
        },
        {
          text: this.sairLogout,
          handler: () => {
            this._storage.remove(Constants.ID_USUARIO);
            this._storage.remove(Constants.TOKEN_USUARIO);
            this._storage.remove(Constants.NOME_PESSOA);
            localStorage.removeItem(Constants.TOKEN_USUARIO);
            this.nav.setRoot(HomePage);
            this.menuCtrl.close();
          }
        }
      ]
    });
    alert.present();
  }

}
