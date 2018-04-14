import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicosListPage } from './servicos-list';

@NgModule({
  declarations: [
    ServicosListPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicosListPage),
  ],
})
export class ServicosListPageModule {}
