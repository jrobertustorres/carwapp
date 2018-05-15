import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';

//ENTITYS
import { OrcamentoEntity } from './../../model/orcamento-entity';

//SEVICES
import { OrcamentoService } from '../../providers/orcamento-service';

//PAGES
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-lancar-orcamento',
  templateUrl: 'lancar-orcamento.html',
})
export class LancarOrcamentoPage {
  private loading = null;
  private orcamentoEntity: OrcamentoEntity;
  public lancarOrcamentoForm: FormGroup;
  public dataSolicitacao: string;
  public desabilitaBotao = false;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private orcamentoService: OrcamentoService,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private datePicker: DatePicker,
              public navParams: NavParams) {
    this.orcamentoEntity = new OrcamentoEntity();
    this.orcamentoEntity = navParams.get('orcamentoEntity');
  }

  ngOnInit() {
    this.desabilitaBotao = false;
    this.lancarOrcamentoForm = this.formBuilder.group({
      'descricao': ['', Validators.maxLength(100)],
      'dataSolicitacao': [''],
    }
    );
    this.lancarOrcamentoForm.controls.dataSolicitacao.disable();
  }

  ionViewDidLoad() {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'O orçamento foi lançado para todos os fornecedores!',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  selecionaDataSolicitacao() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      okText: 'OK',
      cancelText: 'Cancelar',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    })
    .then(dataSolicitacao => {
      this.dataSolicitacao = dataSolicitacao.toISOString();
    }, (err) => {
      console.log('Error occurred while getting date: ', err);
      console.log('---------------------------------------- ', err);
    });
  }

  submeterOrcamento() {
    this.desabilitaBotao = true;
    
    // if (this.lancarOrcamentoForm.valid) {
      try {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...',
          // dismissOnPageChange: true
        });
        this.loading.present();

        this.orcamentoEntity.dataSolicitacao = this.lancarOrcamentoForm.value.dataSolicitacao;
        this.orcamentoEntity.descricao = this.lancarOrcamentoForm.value.descricao;

        console.log(this.orcamentoEntity)
    
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
      } catch (err){
        if(err instanceof RangeError){
          console.log('out of range');
        }
        console.log(err);
      }
    // }
  }

}
