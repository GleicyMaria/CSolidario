import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOngsPage } from './list-ongs.page';

const routes: Routes = [
  {
    path: '',
    component: ListOngsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOngsPageRoutingModule {}
