import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AutorizarGuard} from './utilidades/autorizar.guard';
import {NegarGuard} from './utilidades/negar.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'publicaciones',
    pathMatch: 'full'
  },
  {
    path: 'publicaciones',
    children: [
      {
        path: '',
        loadChildren: () => import('./paginas/publicaciones/publicaciones.module').then( m => m.PublicacionesPageModule)
      },
      {
        path: ':id_publicacion',
        canActivate: [AutorizarGuard],
        loadChildren: () => import('./paginas/editar-publicaciones/editar-publicaciones.module' ).then( m => m.EditarPublicacionesPageModule)
      }

    ]
  },
  {
    path: 'login',
    canLoad: [AutorizarGuard],
    canActivate: [NegarGuard],
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    canActivate: [NegarGuard],
    canLoad: [AutorizarGuard],
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'nueva-publicacion',
    canActivate: [AutorizarGuard],
    loadChildren: () => import('./paginas/nueva-publicacion/nueva-publicacion.module').then( m => m.NuevaPublicacionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
