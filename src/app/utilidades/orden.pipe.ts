import { Pipe, PipeTransform } from '@angular/core';
import { Publicacion } from '../clases/publicacion';

@Pipe({
  name: 'Orden'
})
export class OrdenPipe implements PipeTransform {

  transform(original: Publicacion[], orden: number): Publicacion[] {
    original = original || [];  
    let value = JSON.parse(JSON.stringify(original)); 
      switch (orden){
        case 1:
          return value.sort();
        case 2:
          return value.sort().reverse();
        default:
          return value;  
      }
    
    }

}
