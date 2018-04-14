import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentoPage } from './orcamento';

@NgModule({
  declarations: [
    OrcamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentoPage),
  ],
})
export class OrcamentoPageModule {}
