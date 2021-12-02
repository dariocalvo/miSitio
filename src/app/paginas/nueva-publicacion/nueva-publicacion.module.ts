import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaPublicacionPageRoutingModule } from './nueva-publicacion-routing.module';

import { NuevaPublicacionPage } from './nueva-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaPublicacionPageRoutingModule
  ],
  declarations: [NuevaPublicacionPage]
})
export class NuevaPublicacionPageModule {}
