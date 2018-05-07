import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, AlertController, Nav, MenuController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';

//ENTITY
import { UsuarioEntity } from '../../model/usuario-entity';

//PAGES
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';
import { VeiculosListPage } from './../veiculos-list/veiculos-list';
import { OrcamentosListPage } from './../orcamentos-list/orcamentos-list';
// import { VeiculoPage } from './../veiculo/veiculo';

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
  public nomePessoa: string;
  public emailPessoa: string;
  pages: Array<{title: string, component: any, isVisible: boolean, icon: string}>;

  private usuarioEntity: UsuarioEntity;
  private loading = null;

  constructor(public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              public loginService: LoginService,
              public usuarioService: UsuarioService,
              public platform: Platform,
              private _storage: Storage) {

      this.usuarioEntity = new UsuarioEntity();

      try {

        // this.nomePessoa = localStorage.getItem(Constants.NOME_PESSOA);
        // this.emailPessoa = localStorage.getItem(Constants.EMAIL_PESSOA);

        this._storage.get(Constants.ID_USUARIO).then((idUsuario) => {
          if(!idUsuario){
            this.rootPage = LoginPage;
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
    this.loginService.userChangeEvent.subscribe(nomePessoa => {
      this.nomePessoa = nomePessoa.split(/(\s).+\s/).join("");
    });
    this.loginService.emailPessoaChangeEvent.subscribe(email => {
      this.emailPessoa = email;
    });
    this.pages = [
      { title: 'Home', component: HomePage, isVisible: true, icon: 'ios-home' },
      { title: 'Meus orçamentos', component: OrcamentosListPage, isVisible: true, icon: 'ios-albums' },
      { title: 'Meus veículos', component: VeiculosListPage, isVisible: true, icon: 'ios-car' },
      { title: 'Configurações', component: ConfiguracoesPage, isVisible: true, icon: 'ios-settings' },
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
        content: 'Aguarde...'
      });
      this.loading.present();

      this.usuarioEntity.idUsuario = idUsuario;
      this.loginService.loginByIdService(this.usuarioEntity)
        .then((usuarioEntityResult: UsuarioEntity) => {
          this.rootPage = HomePage;
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
      subTitle: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Ficar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            this._storage.remove(Constants.ID_USUARIO);
            this._storage.remove(Constants.TOKEN_USUARIO);
            this._storage.remove(Constants.NOME_PESSOA);
            localStorage.removeItem(Constants.ID_USUARIO);
            localStorage.removeItem(Constants.TOKEN_USUARIO);
            localStorage.removeItem(Constants.NOME_PESSOA);
            localStorage.removeItem(Constants.EMAIL_PESSOA);
            this.nav.setRoot(LoginPage);
            this.menuCtrl.close();
          }
        }
      ]
    });
    alert.present();
  }

}
