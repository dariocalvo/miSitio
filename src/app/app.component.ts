import { Component, OnInit } from '@angular/core';
import { Usuario } from './clases/usuario';
import { UsuarioService } from './servicios/usuario.service';
import {AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { DatosSessionService } from './servicios/datos-session.service';
import { PublicacionesService } from './servicios/publicaciones.service';
import { Publicacion } from './clases/publicacion';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  fecha:Date = new Date();
  usuario = new Usuario();
  logueado:boolean;
  publicaciones!:Array<Publicacion>;
  public appPages = [];
  ruta:string;
  datos= new FormData();
  mensaje:string;
  
  constructor(private servPub:PublicacionesService, private servUS:UsuarioService, private router:Router, private alert: AlertController, private storage:DatosSessionService ) {
    this.mensaje="";
    this.logueado = this.storage.comprobarlogueo();
    this.storage.evento.subscribe( value => { this.usuario.nombre = value; this.logueado =true;});
  }
  
  ngOnInit(): void {
    this.servPub.cargarPublicaciones();
    this.cargarMenu();
  }
 
  async logout(){
    this.storage.borrarSesion();
    this.logueado=false;
    this.servUS.quitarUsuario();
    this.cargarMenu();
    this.router.navigate(['/publicaciones']);
    await this.msj('Sesion finalizada !!!');
  }

  async baja(){
    const mensaje = await this.alert.create({
      header: 'Eliminar Cuenta',
      message: 'Seguro deseas darte de baja?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler:() => {
            this.ruta = "/Usuario/Baja";
            this.datos.append("usuario", this.storage.S_user());
            this.servUS.traerUsuarioPost(this.ruta, this.datos).subscribe(resp => this.mensaje= <string>JSON.stringify(resp));  
            this.msj('Baja existosa!');
            this.logout();    
        }
      }]
    });
    mensaje.present();
  }

  async msj(texto:string){
    const mensaje = await this.alert.create({
      header: texto,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel'
        }]
    });
    await mensaje.present();
  }

  cargarMenu(){
    if(this.logueado){
      this.usuario.username = this.storage.S_user();
      this.usuario.nombre = this.storage.S_nombre();
    }else{
      this.usuario.username = "";
      this.usuario.nombre = "Visitante";
    }
  }

}
