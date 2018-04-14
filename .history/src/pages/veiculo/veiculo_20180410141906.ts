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
  private tiposVeiculo = null;
  private loading = null;
  public veiculoForm: FormGroup;
  private veiculoEntity: VeiculoEntity;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private veiculoService: VeiculoService) {

    this.veiculoEntity = new VeiculoEntity();

  }

  ngOnInit() {

    this.findTiposVeiculo();

    this.veiculoForm = this.formBuilder.group({
      'idTipoVeiculo': ['', Validators.required],
      'placa': ['', [Validators.required, Validators.maxLength(10)]],
      'frota': ['', [Validators.required, Validators.maxLength(50)]],
      'cor': ['', [Validators.required, Validators.maxLength(50)]],
      'chassi': ['', [Validators.required, Validators.maxLength(100)]],
      'renavan': ['', [Validators.required, Validators.maxLength(100)]],
    });

    
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
    this.tiposVeiculo = dados;
    this.loading.dismiss();
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        subTitle: err.message,
        buttons: ['OK']
      }).present();
    });
  }

}
