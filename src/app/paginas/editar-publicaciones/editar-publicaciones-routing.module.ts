import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPublicacionesPage } from './editar-publicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPublicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPublicacionesPageRoutingModule {}
