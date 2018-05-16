import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoVeiculoListPage } from './historico-veiculo-list';

@NgModule({
  declarations: [
    HistoricoVeiculoListPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoVeiculoListPage),
  ],
})
export class HistoricoVeiculoListPageModule {}
