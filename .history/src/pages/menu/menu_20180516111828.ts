import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, AlertController, Nav, MenuController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Platform } from 'ionic-angular';

//ENTITY
import { UsuarioEntity } from '../../model/usuario-entity';

//PAGES
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';
import { VeiculosListPage } from './../veiculos-list/veiculos-list';
import { OrcamentosListPage } from './../orcamentos-list/orcamentos-list';
import { HistoricoVeiculoListPage } from '../historico-veiculo-list/historico-veiculo-list';

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
  pages: Array<{title: string, component: any, isVisible: boolean, icon: string, id1: number}>;

  private usuarioEntity: UsuarioEntity;
  private loading = null;

  constructor(public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              public loginService: LoginService,
              public usuarioService: UsuarioService,
              public platform: Platform) {

      this.usuarioEntity = new UsuarioEntity();

      try {

        // this._storage.get(Constants.ID_USUARIO).then((idUsuario) => {
          if(!localStorage.getItem(Constants.ID_USUARIO)){
            this.rootPage = LoginPage;
          }
          else if(localStorage.getItem(Constants.ID_USUARIO)) {
            this.callLoginByIdService(localStorage.getItem(Constants.ID_USUARIO));
          }
        // });

        //ERA ASSIM ANTES
        // if(localStorage.getItem(Constants.ID_USUARIO)!=null) {
        //   this.callLoginByIdService();
        // } else {
        //   this.rootPage = HomePage;
        // }
      } catch (err){
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
      { title: 'Home', component: HomePage, isVisible: true, icon: 'ios-home', id1: 1 },
      { title: 'Meus orçamentos', component: OrcamentosListPage, isVisible: true, icon: 'ios-albums', id1: 2 },
      { title: 'Meus veículos', component: VeiculosListPage, isVisible: true, icon: 'ios-car', id1: 3 },
      { title: 'Histórico de manutenção', component: VeiculosListPage, isVisible: true, icon: 'ios-archive', id1: 4 },
      { title: 'Configurações', component: ConfiguracoesPage, isVisible: true, icon: 'ios-settings', id1: 5 },
    ];

    this.usuarioService.userChangeEvent.subscribe(nomePessoa => {
      this.nomePessoa = nomePessoa.split(/(\s).+\s/).join("");
    });
    this.usuarioService.emailPessoaChangeEvent.subscribe(email => {
      this.emailPessoa = email;
    });
    this.loginService.userChangeEvent.subscribe(nomePessoa => {
      this.nomePessoa = nomePessoa.split(/(\s).+\s/).join("");
    });
    this.loginService.emailPessoaChangeEvent.subscribe(email => {
      this.emailPessoa = email;
    });

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
            // this._storage.remove(Constants.ID_USUARIO);
            // this._storage.remove(Constants.TOKEN_USUARIO);
            // this._storage.remove(Constants.NOME_PESSOA);
            localStorage.removeItem(Constants.ID_USUARIO);
            localStorage.removeItem(Constants.TOKEN_USUARIO);
            localStorage.removeItem(Constants.NOME_PESSOA);
            localStorage.removeItem(Constants.EMAIL_PESSOA);
            localStorage.removeItem(Constants.POSSUI_VEICULO);
            this.nav.setRoot(LoginPage);
            this.menuCtrl.close();
          }
        }
      ]
    });
    alert.present();
  }

}
