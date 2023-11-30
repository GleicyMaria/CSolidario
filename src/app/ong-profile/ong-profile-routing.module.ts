import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OngProfilePage } from './ong-profile.page';

const routes: Routes = [
  {
    path: '',
    component: OngProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OngProfilePageRoutingModule {}
