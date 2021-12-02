import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../../clases/publicacion';
import { PublicacionesService } from '../../servicios/publicaciones.service';
import {AlertController, LoadingController} from '@ionic/angular';
import { Rubro } from '../../clases/rubro';
import { RubrosService } from '../../servicios/rubros.service';
import { MenuController } from '@ionic/angular';
import { DatosSessionService } from 'src/app/servicios/datos-session.service';


@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {

  publicaciones!:Array<Publicacion>;
  rubros!:Array<Rubro>;
  ruta!:string;
  id_rubro:number;
  orden:number;
  icon: string;
  
  constructor(private cargando:LoadingController, private storage:DatosSessionService, private servPub:PublicacionesService, private servRub: RubrosService, private alert: AlertController, private menu: MenuController) { 
    this.ruta = "/Publicacion/Activas";
    this.id_rubro = 0;
    this.orden = 1;
    this.icon = "arrow-up";
  }
  
  ngOnInit() {
    this.servPub.iniciarId();
    this.publicaciones = this.servPub.obtenerPublicaciones();
    if (this.publicaciones.length < 1){
      this.Loading(4000);
      this.servPub.traerPublicacionesGet(this.ruta).subscribe(resp => this.publicaciones = <Array<Publicacion>>resp);
    }else{
      this.Loading(200);
    }
    this.servRub.traerRubrosGet("/Rubro/Listar").subscribe(resp => this.rubros = <Array<Rubro>>resp);
  }

  ionViewWillEnter(){
    this.publicaciones = this.servPub.obtenerPublicaciones();
   }

  async Loading(duracion:number) {
    const loading = await this.cargando.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: duracion
    });
    return await loading.present();
  }



  mostrar(id:string){
    if (id == this.storage.S_id()){
      return true;
    }
    return false;
  }

  agregar(){
    if (this.storage.comprobarlogueo()){
      return true;
    }
    return false;
  }  

   async eliminar(id:string){
    const mensaje = await this.alert.create({
      header: 'Borrar publicación',
      message: 'Seguro deseas proceder con esta acción?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler:() => {
            this.servPub.publicaciones = this.publicaciones.filter(publicacion =>{
              return publicacion.id_publicacion != id});
              this.publicaciones = this.servPub.obtenerPublicaciones();   
              this.servPub.eliminarBD(id);
        }
      }]
    });
    await mensaje.present();
  } 

  ordenar(){
    if(this.orden == 1){
      this.orden = 2;
      this.icon = "arrow-down";
    }else{
      this.orden = 1;
      this.icon = "arrow-up";
    }
  }
  

}
