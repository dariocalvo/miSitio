import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesPageRoutingModule } from './publicaciones-routing.module';

import { PublicacionesPage } from './publicaciones.page';
import {PipesModule} from '../../utilidades/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacionesPageRoutingModule,
    PipesModule
  ],
  declarations: [PublicacionesPage],
  
})
export class PublicacionesPageModule {}
