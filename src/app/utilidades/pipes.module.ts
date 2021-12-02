import { NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {FiltroRubrosPipe} from './filtro-rubros.pipe'
import { OrdenPipe } from './orden.pipe';
import { FiltroUsuarioPipe } from './filtro-usuario.pipe';


@NgModule({
  declarations: [FiltroRubrosPipe, OrdenPipe, FiltroUsuarioPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FiltroRubrosPipe, OrdenPipe, FiltroUsuarioPipe]
})
export class PipesModule { }
