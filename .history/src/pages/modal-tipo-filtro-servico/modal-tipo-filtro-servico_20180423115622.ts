import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// SERVICES
import { EstadosService } from '../../providers/estados-service';
import { CidadesService } from '../../providers/cidades-service';

@IonicPage()
@Component({
  selector: 'page-modal-tipo-filtro-servico',
  templateUrl: 'modal-tipo-filtro-servico.html',
})
export class ModalTipoFiltroServicoPage {
  private estadoDisabled: boolean;
  private estados = [];
  private cidades = [];

  constructor(public navCtrl: NavController, 
              private estadosService: EstadosService,
              private cidadesService: CidadesService,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.estadoDisabled = true;
    this.estadosService
      .getEstados()
      .subscribe(dados => {
      this.estados = dados;
    });
    // this.findServicosList(this.idTipoServico);
  }

  disableEstado(status) {
    this.estadoDisabled = status;
    console.log(this.estadoDisabled);
  }

}
