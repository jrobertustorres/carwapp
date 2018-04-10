import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculosListPage } from './veiculos-list';

@NgModule({
  declarations: [
    VeiculosListPage,
  ],
  imports: [
    IonicPageModule.forChild(VeiculosListPage),
  ],
})
export class VeiculosListPageModule {}
