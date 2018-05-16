import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoVeiculoPage } from './historico-veiculo';

@NgModule({
  declarations: [
    HistoricoVeiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoVeiculoPage),
  ],
})
export class HistoricoVeiculoPageModule {}
