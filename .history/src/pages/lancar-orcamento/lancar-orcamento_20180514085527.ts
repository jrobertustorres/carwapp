import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//ENTITYS
import { OrcamentoEntity } from './../../model/orcamento-entity';

@IonicPage()
@Component({
  selector: 'page-lancar-orcamento',
  templateUrl: 'lancar-orcamento.html',
})
export class LancarOrcamentoPage {
  private orcamentoParameter: OrcamentoEntity;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.orcamentoParameter = new OrcamentoEntity();
    this.orcamentoParameter = navParams.get('orcamentoEntity');
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
  }

  lancarOrcamento() {
    // this.listIdVeiculo.push(this.idVeiculo);
    // this.servicoOrcamentoEntity = new ServicoOrcamentoEntity();
    // this.servicoOrcamentoEntity.idServico = this.idServico;
    // this.servicoOrcamentoEntity.descricao = descricao;

    // this.orcamentoEntity.listIdVeiculo = this.listIdVeiculo;
    // this.orcamentoEntity.listIdFornecedor = this.listIdFornecedor;
    // this.orcamentoEntity.listServicoOrcamento = [];
    // this.orcamentoEntity.listServicoOrcamento.push(this.servicoOrcamentoEntity); // idservico e descricao

    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.orcamentoService
    .lancarOrcamentoServico(this.orcamentoEntity)
    .then((orcamentoEntityResult: OrcamentoEntity) => {
      this.loading.dismiss();
      this.presentToast();
      setTimeout(() => {
        this.navCtrl.setRoot(HomePage);
      }, 3000);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

}
