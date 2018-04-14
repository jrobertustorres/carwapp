import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { MyApp } from './app.component';

//PAGES
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { MenuPage } from '../pages/menu/menu';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { ModalPoliticaPrivacidadePage } from '../pages/modal-politica-privacidade/modal-politica-privacidade';
import { ModalTermosPage } from '../pages/modal-termos/modal-termos';
import { MeusDadosPage } from '../pages/meus-dados/meus-dados';
import { MinhaSenhaPage } from '../pages/minha-senha/minha-senha';
import { VeiculosListPage } from './../pages/veiculos-list/veiculos-list';
import { VeiculoPage } from './../pages/veiculo/veiculo';
import { OrcamentosListPage } from './../pages/orcamentos-list/orcamentos-list';
import { OrcamentoPage } from './../pages/orcamento/orcamento';


//SERVICES
import { EstadosService } from '../providers/estados-service';
import { CidadesService } from '../providers/cidades-service';
import { LoginService } from '../providers/login-service';
import { UsuarioService } from '../providers/usuario-service';

//ENTITYS
import { UsuarioEntity } from '../model/usuario-entity';
import { UsuarioDetalheEntity } from '../model/usuario-detalhe-entity';
import { VeiculoEntity } from '../model/veiculo-entity';
import { TipoVeiculoEntity } from './../model/tipo-veiculo-entity';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

function provideStorage() {
  return new Storage({ 
    name: 'carwapp',
    storeName: 'usuario'
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RecuperarSenhaPage,
    MenuPage,
    ConfiguracoesPage,
    ModalPoliticaPrivacidadePage,
    ModalTermosPage,
    MeusDadosPage,
    MinhaSenhaPage,
    VeiculosListPage,
    VeiculoPage,
    OrcamentosListPage,
    OrcamentoPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RecuperarSenhaPage,
    MenuPage,
    ConfiguracoesPage,
    ModalPoliticaPrivacidadePage,
    ModalTermosPage,
    MeusDadosPage,
    MinhaSenhaPage,
    VeiculosListPage,
    VeiculoPage,
    OrcamentosListPage,
    OrcamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    UsuarioService,
    EstadosService,
    CidadesService,
    UsuarioEntity,
    UsuarioDetalheEntity,
    VeiculoEntity,
    TipoVeiculoEntity,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage}
  ]
})
export class AppModule {}
