import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/clases/publicacion';
import { Rubro } from 'src/app/clases/rubro';
import { Usuario } from 'src/app/clases/usuario';
import { DatosSessionService } from 'src/app/servicios/datos-session.service';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { RubrosService } from 'src/app/servicios/rubros.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.page.html',
  styleUrls: ['./nueva-publicacion.page.scss'],
})
export class NuevaPublicacionPage implements OnInit {

  nuevaPublicacion:Publicacion;
  rubros!:Array<Rubro>;
  usuario:string;
  id_rubro: string;
  rubro_seleccionado:string;
  ok:number;
  mensaje:string;
  sumadorId:number;


  constructor(private vibration: Vibration, private servUs:DatosSessionService, private servPu:PublicacionesService, private servRub: RubrosService, private router:Router) { 
    this.nuevaPublicacion = new Publicacion();
    this.ok=0;
    this.mensaje="";
  }

  ngOnInit() {
    this.armarPublicacion();
  }

  ionViewWillEnter(){
    this.armarPublicacion();
  }

  armarPublicacion(){
    if(this.servUs.comprobarlogueo){
      this.sumadorId= parseInt(this.servUs.S_pub());
      this.usuario = this.servUs.S_user();
      this.nuevaPublicacion.id_usuario = this.servUs.S_id();
      this.nuevaPublicacion.id_publicacion = this.servUs.S_pub(); 
      this.nuevaPublicacion.username = this.usuario;
      this.nuevaPublicacion.fecha = new Date();
      this.servRub.traerRubrosGet("/Rubro/Listar").subscribe(resp => this.rubros = <Array<Rubro>>resp);
    }else{
      this.router.navigate(['/login']);
    }
    this.mensaje="";
  }



  asignar(event){
    for(let i = 0 ; i < this.rubros.length ; i++){
      if (event.detail.value == this.rubros[i].id_rubro){
        this.nuevaPublicacion.categoria = this.rubros[i].categoria;
      }
    }
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

enviar(){
  this.ok = 0;
  if (!this.comprobar(this.nuevaPublicacion.categoria)){
    this.ok++;
  }
  
  if (!this.comprobar(this.nuevaPublicacion.titulo)){
    this.ok++;
  }
  
  if (!this.comprobar(this.nuevaPublicacion.contenido)){
    this.ok++;
  }

  if (!this.comprobar(this.nuevaPublicacion.pie)){
    this.ok++;
  }
  
  if (this.ok == 0){
    this.guardar();
  }else{
    this.vibration.vibrate(700);
    this.mensaje = "La publicación no esta completa, verifica que no falten datos y haya una categoria seleccionada";
  }
}

  guardar(){
    this.sumadorId = this.sumadorId+1;
    this.servPu.sumarId(this.sumadorId);
    this.servPu.nuevaPublicacion(this.nuevaPublicacion);
    this.servPu.guardarBD(this.nuevaPublicacion);
    this.router.navigate(['/publicaciones']);
  }

}
