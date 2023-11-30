import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { CadastroOngPageRoutingModule } from './cadastro-ong-routing.module';

import { CadastroOngPage } from './cadastro-ong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroOngPageRoutingModule
  ],
  declarations: [CadastroOngPage]
})
export class CadastroOngPageModule {}
