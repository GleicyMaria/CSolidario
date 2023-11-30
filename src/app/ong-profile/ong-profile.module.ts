import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OngProfilePageRoutingModule } from './ong-profile-routing.module';

import { OngProfilePage } from './ong-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OngProfilePageRoutingModule
  ],
  declarations: [OngProfilePage]
})
export class OngProfilePageModule {}
