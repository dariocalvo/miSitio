import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {AlertController} from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nuevoUsuario:Usuario;
  comprobacion:Usuario;
  mensaje:string;
  msjpas:string;
  ok:number;
  usuarioDisponible: boolean = false;
  datos= new(FormData);

  constructor(private vibration: Vibration, private servUs:UsuarioService, private router:Router,private alert: AlertController) { 
    this.nuevoUsuario = new(Usuario);
    this.comprobacion = new(Usuario);
    this.msjpas= "";
    this.ok=0;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.nuevoUsuario = new(Usuario);
    this.comprobacion = new(Usuario);
    this.msjpas= "";
  }

  
    borrarMSJ(control:number){
      switch (control){
        case 1:
          this.comprobacion.nombre="";
          break;
        case 2:
          this.comprobacion.email="";
          break;
        case 3:
          this.comprobacion.username="";
          break;
        case 4:
          this.msjpas="";
          break;
      }
    }
  
  comprobar(valor:any):Boolean{
    if (valor.match(/^(?!\s).+$/)){
      return true;
    }else{
      return false;
    }
  }

  async comprobarUsuario(){
    this.datos.append("usuario", this.nuevoUsuario.username);
    this.servUs.traerUsuarioPost("/Usuario/Buscar", this.datos).subscribe(resp => 
      {
       if (resp){
          this.vibration.vibrate(250);
          this.comprobacion.username = 'Usuario existente, debes elejir otro nombre. ';
          this.usuarioDisponible= false;
        }else{
          this.comprobacion.username = '';
          this.usuarioDisponible= true;
        }
      });
  }

  enviar(){
    this.ok = 0;
    if (this.comprobar(this.nuevoUsuario.nombre)){
      this.comprobacion.nombre ="";
    }else{
      this.comprobacion.nombre ="El nombre no es válido. ";
      this.ok++;
    }
    
    if (this.comprobar(this.nuevoUsuario.username)){
      if (this.usuarioDisponible){
        this.comprobacion.username ="";
      }else{
        this.ok++;  
      }
    }else{
      this.comprobacion.username = "El usuario no es válido. ";
      this.ok++;
    }
    
    if (this.nuevoUsuario.email.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/))
    /*if (this.comprobar(this.email))*/{
      this.comprobacion.email = "";
    }else{
      this.comprobacion.email= "La direccion de correo no es válida. ";
      this.ok++;
    }
    
    if (this.comprobar(this.nuevoUsuario.password)){
      this.msjpas ="";
    }else{
      this.msjpas ="La contraseña no es válida. ";
      this.ok++;
    }

    if (this.ok == 0){
      this.guardar();
    }else{
      this.vibration.vibrate(500);
    }
  }

  async guardar(){
      this.datos.append("nombre", this.nuevoUsuario.nombre);
      this.datos.append("usuario", this.nuevoUsuario.username);
      this.datos.append("email", this.nuevoUsuario.email);
      this.datos.append("pass", this.nuevoUsuario.password);
      this.datos.append("avatar", "");
      this.servUs.traerUsuarioPost("/Usuario/Nuevo", this.datos).subscribe(resp => this.mensaje= JSON.stringify(resp));
      const mensaje = await this.alert.create({
          header: 'Registro Exitoso',
          message: 'Bienvenido ' +this.nuevoUsuario.nombre+ '!!!',
          buttons: [
            {
              text: 'Ok',
              handler:() => {
                this.router.navigate(["login"]);
            }
          }]
        });
        await mensaje.present();
      this.router.navigate(["login"]);
  }


}
