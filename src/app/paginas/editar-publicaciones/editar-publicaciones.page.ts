import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../servicios/publicaciones.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from '../../clases/publicacion';
import { DatosSessionService } from 'src/app/servicios/datos-session.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-editar-publicaciones',
  templateUrl: './editar-publicaciones.page.html',
  styleUrls: ['./editar-publicaciones.page.scss'],
})
export class EditarPublicacionesPage implements OnInit {

  publicacion:Publicacion;
  titulo:string;
  pie:string;
  contenido:string;
  ok:number;
  mensaje:string;
  
  constructor(private vibration: Vibration, private servPub:PublicacionesService, private rutaActiva: ActivatedRoute, private router: Router, private storage: DatosSessionService) {
    this.publicacion = new Publicacion();
    this.ok=0;
    this.mensaje="";
  }

  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametro => {
      const id = parametro.get('id_publicacion')
      this.publicacion = this.servPub.obtenerPublicacion(id);
      this.titulo = this.publicacion.titulo;
      this.contenido = this.publicacion.contenido;
      this.pie = this.publicacion.pie;
    })
    this.publicacion.username = this.storage.S_user();
  }

  borrarMSJ(){
    this.mensaje="";
  }

  comprobar(valor:any):Boolean{
    if (valor.match(/^(?!\s).+$/)){
      return true;
    }else{
      return false;
    }
  }
  
  guardar(){
    this.ok = 0;
    if (!this.comprobar(this.publicacion.titulo)){
      this.ok++;
    }
    
    if (!this.comprobar(this.publicacion.contenido)){
      this.ok++;
    }
  
    if (!this.comprobar(this.publicacion.pie)){
      this.ok++;
    }
    
    if (this.ok == 0){
      this.servPub.editarBD(this.publicacion);
      this.router.navigate(['/publicaciones']);  
    }else{
      this.vibration.vibrate(700);
      this.mensaje = "La publicación no esta completa, verifica los datos ";
    }
  }
 
  cancelar(){
    this.publicacion.titulo = this.titulo;
    this.publicacion.contenido = this.contenido;
    this.publicacion.pie = this.pie;
    this.router.navigate(['/publicaciones']);
  }


}
