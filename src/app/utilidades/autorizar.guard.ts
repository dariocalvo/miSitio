import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AlertController, LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutorizarGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private alert: AlertController){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if (localStorage.getItem('id') != '' && localStorage.getItem('id') != null){
        return true;
      }
      this.router.navigate(['/login']);
      this.msj();
      return false;
  }

  async msj(){
    const mensaje = await this.alert.create({
      header: 'Acceso no permitido',
      message: 'Se requiere inicio de sesion para permitir el acceso.',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel'
        }]
    });
    await mensaje.present();
  } 






  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('id') != '' && localStorage.getItem('id') != null){
        this.router.navigate(['/publicaciones']);
        return false;
      }
      return true;
  }
}
