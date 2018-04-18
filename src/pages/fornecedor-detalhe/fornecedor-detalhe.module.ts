import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FornecedorDetalhePage } from './fornecedor-detalhe';

@NgModule({
  declarations: [
    FornecedorDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(FornecedorDetalhePage),
  ],
})
export class FornecedorDetalhePageModule {}
