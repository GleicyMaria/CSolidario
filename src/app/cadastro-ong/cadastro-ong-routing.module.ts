import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroOngPage } from './cadastro-ong.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroOngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroOngPageRoutingModule {}
