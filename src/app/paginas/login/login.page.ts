import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosSessionService } from 'src/app/servicios/datos-session.service';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logueado:Usuario[];
  usuario!:string;
  password!:string;
  mensaje:string;
  datos= new FormData(); 

  constructor(private vibration: Vibration, private servPub: PublicacionesService, private servUs: UsuarioService, private storage:DatosSessionService, private router: Router) {
    this.usuario="";
    this.password="";
    this.mensaje="";
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.usuario="";
    this.password="";
    this.mensaje="";
  }

  ingresar(){
    this.datos.append("usuario", this.usuario);
    this.datos.append("pass", this.password);
  	this.servUs.traerUsuarioPost("/Usuario/Buscar", this.datos).subscribe(resp => 
      {
        if (resp){
          this.logueado = <Array<Usuario>>resp;
          this.storage.inicioSesion(this.logueado[0].nombre);
          this.servUs.agregarUsuario(this.logueado[0]);
          this.storage.guardarSesion(this.logueado[0]);
          this.storage.guardarIdPub(this.servPub.iniciarId());
          this.router.navigate(['/publicaciones']);
        }else{
          this.vibration.vibrate(1000); 
          this.mensaje = "Usuario o contraseña incorrectos";
          this.usuario = "";
          this.password ="";
        }
        this.usuario="";
        this.password="";
      });
  }

  borrarMSJ(){
    this.mensaje="";
  }


}
