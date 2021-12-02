import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPublicacionesPageRoutingModule } from './editar-publicaciones-routing.module';

import { EditarPublicacionesPage } from './editar-publicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPublicacionesPageRoutingModule
  ],
  declarations: [EditarPublicacionesPage]
})
export class EditarPublicacionesPageModule {}
