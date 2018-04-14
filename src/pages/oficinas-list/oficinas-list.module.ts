import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OficinasListPage } from './oficinas-list';

@NgModule({
  declarations: [
    OficinasListPage,
  ],
  imports: [
    IonicPageModule.forChild(OficinasListPage),
  ],
})
export class OficinasListPageModule {}
