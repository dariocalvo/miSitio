import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rubro } from '../clases/rubro';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  rubros!:Array<Rubro>;
  ruta!:string;

  constructor(private http:HttpClient) {
    this.ruta = "/Rubro/Listar";
    this.traerRubrosGet(this.ruta).subscribe(resp => this.rubros = <Array<Rubro>>resp);
  }

  traerRubrosGet(url: string){
    return this.http.get(environment.servidor + url);
  }

  cargarRubros(){
    return [...this.rubros];
  }

}
