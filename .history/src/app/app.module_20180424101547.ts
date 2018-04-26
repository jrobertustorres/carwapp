import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation'; 
// import { Locations } from '../providers/locations';
// import { GoogleMaps } from '../providers/google-maps';
// import { Connectivity } from '../providers/connectivity';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Ionic2RatingModule } from 'ionic2-rating';

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
import { ServicosListPage } from './../pages/servicos-list/servicos-list';
import { OficinasListPage } from './../pages/oficinas-list/oficinas-list';
import { TiposServicoListPage } from '../pages/tipos-servico-list/tipos-servico-list';
import { FornecedorDetalhePage } from './../pages/fornecedor-detalhe/fornecedor-detalhe';
import { AvaliacaoFornecedorPage } from './../pages/avaliacao-fornecedor/avaliacao-fornecedor';
import { ModalTipoFiltroServicoPage } from '../pages/modal-tipo-filtro-servico/modal-tipo-filtro-servico';


//SERVICES
import { EstadosService } from '../providers/estados-service';
import { CidadesService } from '../providers/cidades-service';
import { LoginService } from '../providers/login-service';
import { UsuarioService } from '../providers/usuario-service';
import { VeiculoService } from '../providers/veiculo-service';
import { ServicoService } from '../providers/servico-service';
import { FornecedorService } from '../providers/fornecedor-service';

//ENTITYS
import { UsuarioEntity } from '../model/usuario-entity';
import { UsuarioDetalheEntity } from '../model/usuario-detalhe-entity';
import { VeiculoEntity } from '../model/veiculo-entity';
import { TipoVeiculoEntity } from './../model/tipo-veiculo-entity';
import { MarcaEntity } from './../model/marca-entity';
import { ModeloEntity } from '../model/modelo-entity';
import { ServicoEntity } from '../model/servico-entity';
import { TipoServicoEntity } from '../model/tipo-servico-entity';
import { FornecedorEntity } from '../model/fornecedor-entity';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectivityProvider } from '../providers/connectivity';
import { GoogleMapsProvider } from '../providers/google-maps';
import { LocationsProvider } from '../providers/locations';

import { HttpClientModule, HttpClient } from '@angular/common/http';

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
    OrcamentoPage,
    ServicosListPage,
    OficinasListPage,
    TiposServicoListPage,
    FornecedorDetalhePage,
    AvaliacaoFornecedorPage,
    ModalTipoFiltroServicoPage
  ],
  imports: [
    HttpModule,
    HttpClient,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    },
  ), Ionic2RatingModule
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
    OrcamentoPage,
    ServicosListPage,
    OficinasListPage,
    TiposServicoListPage,
    FornecedorDetalhePage,
    AvaliacaoFornecedorPage,
    ModalTipoFiltroServicoPage
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
    VeiculoService,
    MarcaEntity,
    ModeloEntity,
    ServicoEntity,
    TipoServicoEntity,
    ServicoService,
    FornecedorEntity,
    FornecedorService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage},
    ConnectivityProvider,
    GoogleMapsProvider,
    LocationsProvider,
    Network,
    Geolocation
  ]
})
export class AppModule {}
