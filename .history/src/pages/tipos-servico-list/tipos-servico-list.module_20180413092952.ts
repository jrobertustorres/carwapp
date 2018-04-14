import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiposServicosListPage } from './tipos-servicos-list';

@NgModule({
  declarations: [
    TiposServicosListPage,
  ],
  imports: [
    IonicPageModule.forChild(TiposServicosListPage),
  ],
})
export class TiposServicosListPageModule {}
