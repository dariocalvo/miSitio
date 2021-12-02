import { Pipe, PipeTransform } from '@angular/core';
import { Publicacion } from '../clases/publicacion';

@Pipe({
  name: 'FiltroRubros'
})
export class FiltroRubrosPipe implements PipeTransform {

  transform(value: Publicacion[], id_rubro: string): Publicacion[] {
    if ((id_rubro??"")=="" || id_rubro == '0') return value;
    return value.filter(p => p.id_rubro.toString().indexOf(id_rubro.toString()) > -1);
  }

}
