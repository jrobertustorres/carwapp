import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage'
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation'; 
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AppVersion } from '@ionic-native/app-version';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { DatePicker } from '@ionic-native/date-picker';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {MaskUtil} from '../utilitarios/mask';

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
import { MapPage } from './../pages/map/map';
import { OrcamentosRespondidosListPage } from '../pages/orcamentos-respondidos-list/orcamentos-respondidos-list';
import { DetalheCotacaoPage } from '../pages/detalhe-cotacao/detalhe-cotacao';
import { ModalImagemFornecedorPage } from '../pages/modal-imagem-fornecedor/modal-imagem-fornecedor';
import { LancarOrcamentoPage } from './../pages/lancar-orcamento/lancar-orcamento';
import { HistoricoVeiculoListPage } from './../pages/historico-veiculo-list/historico-veiculo-list';
import { HistoricoVeiculoPage } from '../pages/historico-veiculo/historico-veiculo';
import { ModalMarcaVeiculoPage } from '../pages/modal-marca-veiculo/modal-marca-veiculo';
import { ModalCidadesPage } from '../pages/modal-cidades/modal-cidades';

//SERVICES
import { EstadosService } from '../providers/estados-service';
import { CidadesService } from '../providers/cidades-service';
import { LoginService } from '../providers/login-service';
import { UsuarioService } from '../providers/usuario-service';
import { VeiculoService } from '../providers/veiculo-service';
import { ServicoService } from '../providers/servico-service';
import { FornecedorService } from '../providers/fornecedor-service';
import { OrcamentoService } from '../providers/orcamento-service';
import { OrdemServicoService } from '../providers/ordem-servico-service';

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
import { OrcamentoEntity } from './../model/orcamento-entity';
import { ServicoOrcamentoEntity } from '../model/servico-orcamento-entity';
import { DetalheServicoOrcamentoEntity } from '../model/detalhe-servico-orcamento-entity';
import { DetalheOrcamentoEntity } from './../model/detalhe-orcamento-entity';
import { CotacaoEntity } from '../model/cotacao-entity';
import { DetalheCotacaoEntity } from '../model/detalhe-cotacao-entity';
import { ImagemFornecedorEntity } from '../model/imagem-fornecedor-entity';
import { HistoricoVeiculoEntity } from '../model/historico-veiculo-entity';
import { OrdemServicoEntity } from '../model/orderm-servico-entity';
import { HistoricoVeiculoDetalheEntity } from '../model/historico-veiculo-detalhe-entity';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectivityProvider } from '../providers/connectivity';
import { GoogleMapsProvider } from '../providers/google-maps';
import { LocationsProvider } from '../providers/locations';

import { HttpClientModule } from '@angular/common/http';

// function provideStorage() {
//   return new Storage({ 
//     name: 'carwapp',
//     storeName: 'usuario'
//   });
// }

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
    ModalTipoFiltroServicoPage,
    OrcamentosRespondidosListPage,
    DetalheCotacaoPage,
    ModalImagemFornecedorPage,
    MapPage,
    LancarOrcamentoPage,
    HistoricoVeiculoListPage,
    HistoricoVeiculoPage,
    ModalMarcaVeiculoPage,
    ModalCidadesPage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    SelectSearchableModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    },
  ), 
  IonicStorageModule.forRoot({
    name: 'carwapp',
    storeName: 'usuario',
    driverOrder: ['indexeddb']
  })
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
    ModalTipoFiltroServicoPage,
    OrcamentosRespondidosListPage,
    DetalheCotacaoPage,
    ModalImagemFornecedorPage,
    MapPage,
    LancarOrcamentoPage,
    HistoricoVeiculoListPage,
    HistoricoVeiculoPage,
    ModalMarcaVeiculoPage,
    ModalCidadesPage
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
    OrcamentoEntity,
    OrcamentoService,
    OrdemServicoService,
    ServicoOrcamentoEntity,
    DetalheServicoOrcamentoEntity,
    DetalheOrcamentoEntity,
    CotacaoEntity,
    DetalheCotacaoEntity,
    ImagemFornecedorEntity,
    HistoricoVeiculoEntity,
    OrdemServicoEntity,
    HistoricoVeiculoDetalheEntity,
    MaskUtil,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {provide: Storage, useFactory: provideStorage},
    ConnectivityProvider,
    GoogleMapsProvider,
    LocationsProvider,
    Network,
    AppVersion,
    Geolocation,
    Diagnostic,
    LocationAccuracy,
    DatePicker,
    Push
  ]
})
export class AppModule {}
