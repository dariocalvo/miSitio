import { HttpClient} from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publicacion } from '../clases/publicacion';
import { DatosSessionService } from './datos-session.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  publicaciones:Array<Publicacion>=[];
  ruta!:string;
  datos_id = [{ultimo_ID: '0'}];
  respuesta:string;
  nuevo_id:number; 
  datos = new FormData();
  mensaje:string;
  
  constructor(private http:HttpClient, private storage: DatosSessionService) {
    this.ruta = "/Publicacion/Activas";
    this.traerPublicacionesGet(this.ruta).subscribe(resp => this.publicaciones = <Array<Publicacion>>resp);
  }

  traerPublicacionesGet(url: string):Observable<Array<any>>{
    return <Observable<Array<any>>>this.http.get(environment.servidor + url);
  }

  cargarPublicaciones(){
    return this.traerPublicacionesGet(this.ruta).subscribe(resp => this.publicaciones = <Array<Publicacion>>resp);
  }

  obtenerPublicaciones(){
    return [...this.publicaciones];
  }

  obtenerPublicacion(id: string){
    return this.publicaciones.find(publicacion => {
        return publicacion.id_publicacion == id
    });
  }

  borrarPublicacion(id:string){ 
    this.publicaciones = this.publicaciones.filter(publicacion =>{
      return publicacion.id_publicacion != id;
    })
  }

  editarPublicacion(){ 
    return this.publicaciones;
  }


  nuevaPublicacion(publicacion:Publicacion){
    this.publicaciones.unshift(publicacion);
  }

  obtenerUltimoId(){
    return <Observable<Array<any>>>this.http.get(environment.servidor + "/Publicacion/ObtenerId");
  }
  
  iniciarId():number{
    this.obtenerUltimoId().subscribe(resp => { this.datos_id = <Array<any>>resp; });
    let ultimo = this.datos_id[0].ultimo_ID;
    return this.nuevo_id = parseInt(ultimo)+1;
  }

  sumarId(id:number){
    this.storage.guardarIdPub(id);
  }

  nuevoId(){
    return this.storage.S_id();  
  }

  eliminarBD(id:string){
    this.ruta = "/Publicacion/Bloquear";
    this.datos.append("id_publicacion", id);
    this.datos.append("autorizacion", "3");
    this.http.post(environment.servidor + this.ruta, this.datos).subscribe(resp => this.mensaje= <string>JSON.stringify(resp));  
  }

  editarBD(publicacion:Publicacion){
    this.ruta = "/Publicacion/EditarEDI";
    this.datos.append("id_publicacion", publicacion.id_publicacion);
    this.datos.append("titulo", publicacion.titulo);
    this.datos.append("contenido", publicacion.contenido);
    this.datos.append("pie", publicacion.pie);
    this.http.post(environment.servidor + this.ruta, this.datos).subscribe(resp => this.mensaje= <string>JSON.stringify(resp));
  } 

  guardarBD(publicacion:Publicacion){
    this.ruta = "/Publicacion/Nueva";
    this.datos.append("id_usuario", publicacion.id_usuario);
    this.datos.append("id_rubro", publicacion.id_rubro);
    this.datos.append("titulo", publicacion.titulo);
    this.datos.append("contenido", publicacion.contenido);
    this.datos.append("pie", publicacion.pie);
    this.http.post(environment.servidor + this.ruta, this.datos).subscribe(resp => this.mensaje= <string>JSON.stringify(resp));
  }









}
