import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroUserPage } from './cadastro-user.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroUserPageRoutingModule {}
