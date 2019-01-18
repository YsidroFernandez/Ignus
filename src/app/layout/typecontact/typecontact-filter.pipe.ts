import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class TypecontactFilterPipe implements PipeTransform {
    transform(items: any[], tyconNombre: string,tyconDescripcion: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (tyconNombre && item.name.toLowerCase().indexOf(tyconNombre.toLowerCase()) === -1){
                return false;
            }
            if (tyconDescripcion && item.description.toLowerCase().indexOf(tyconDescripcion.toLowerCase()) === -1){
                return false;
            }
            return true;
       })
    }
    else{
        return items;
    }
}
}