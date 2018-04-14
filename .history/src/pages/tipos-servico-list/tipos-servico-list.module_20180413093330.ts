import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiposServicoListPage } from './tipos-servico-list';

@NgModule({
  declarations: [
    TiposServicoListPage,
  ],
  imports: [
    IonicPageModule.forChild(TiposServicoListPage),
  ],
})
export class TiposServicosListPageModule {}
