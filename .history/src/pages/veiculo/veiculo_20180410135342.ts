import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

//SEVICES
import { VeiculoService } from './../../providers/veiculo-service';

//ENTITYS
import { VeiculoEntity } from '../../model/veiculo-entity';

@IonicPage()
@Component({
  selector: 'page-veiculo',
  templateUrl: 'veiculo.html',
})
export class VeiculoPage {
  private tiposVeiculo = {};
  private loading = null;
  public veiculoForm: FormGroup;
  private veiculoEntity: VeiculoEntity;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private veiculoService: VeiculoService) {

  }

  ngOnInit() {

    this.findTiposVeiculo();

    this.veiculoForm = this.formBuilder.group({
      'idTipoVeiculo': ['', Validators.required],
      'placa': ['', [Validators.required, Validators.maxLength(20)]],
      'frota': ['', [Validators.required, Validators.maxLength(20)]],
      'cor': ['', [Validators.required, Validators.maxLength(20)]],
      'chassi': ['', [Validators.required, Validators.maxLength(20)]],
      'renavan': ['', [Validators.required, Validators.maxLength(20)]],
    }
    );

    
  }

  ionViewDidLoad() {
  }

  findTiposVeiculo() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
    this.veiculoService
    .findTipoVeiculo()
    .then((dados) => {
      console.log(dados);
    this.tiposVeiculo = dados;
    this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

}
