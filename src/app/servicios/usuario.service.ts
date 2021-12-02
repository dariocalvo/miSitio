import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Array<Usuario> = [];
  
  constructor(private http:HttpClient) {}

  traerUsuarioPost(url: string, peticion:any){
    return this.http.post(environment.servidor + url, peticion);
  }

  obtenerUsuario(): Usuario[]{
    return this.usuario;
  }

  agregarUsuario(logueado:Usuario){
    this.usuario.push(logueado);
  }

  quitarUsuario(){
    this.usuario.pop();
  }

}
