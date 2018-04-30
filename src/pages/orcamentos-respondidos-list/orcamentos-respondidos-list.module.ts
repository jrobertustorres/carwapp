import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentosRespondidosListPage } from './orcamentos-respondidos-list';

@NgModule({
  declarations: [
    OrcamentosRespondidosListPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentosRespondidosListPage),
  ],
})
export class OrcamentosRespondidosListPageModule {}
