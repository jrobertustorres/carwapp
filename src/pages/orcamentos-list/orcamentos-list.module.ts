import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentosListPage } from './orcamentos-list';

@NgModule({
  declarations: [
    OrcamentosListPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentosListPage),
  ],
})
export class OrcamentosListPageModule {}
