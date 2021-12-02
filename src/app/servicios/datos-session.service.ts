import { EventEmitter, Injectable, Output } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})

export class DatosSessionService {

  @Output() evento = new EventEmitter<string>();

  usuario:Usuario[];
  sesion:boolean;

  constructor() {
  }

  guardarSesion(logueado:Usuario):boolean{
    localStorage.setItem('nombre', logueado.nombre);
    localStorage.setItem('user', logueado.username);
    localStorage.setItem('id', logueado.id_usuario);
    return this.sesion=true;
  }

  guardarIdPub(id:number){
    localStorage.setItem('id_pub', id.toString());
  }
  
  S_pub(){
    return localStorage.getItem('id_pub');
  }

  S_nombre(){
    return localStorage.getItem('nombre');
  }

  S_id(){
    return localStorage.getItem('id');
  }

  S_user(){
    return localStorage.getItem('user');
  }

  borrarSesion(){
    localStorage.clear();
    return this.sesion=false;
  }

  comprobarlogueo():boolean{
    return localStorage.getItem('id') !== '' && localStorage.getItem('id') !== null;
  }

  inicioSesion(nombre: string) {
    this.evento.emit(nombre);
  };

}


