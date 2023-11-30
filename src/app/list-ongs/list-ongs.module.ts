import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOngsPageRoutingModule } from './list-ongs-routing.module';

import { ListOngsPage } from './list-ongs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOngsPageRoutingModule
  ],
  declarations: [ListOngsPage]
})
export class ListOngsPageModule {}
