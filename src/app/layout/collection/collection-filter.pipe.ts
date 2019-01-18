import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class CollectionFilterPipe implements PipeTransform {
    transform(items: any[], collNombre: string, collDescripcion: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (collNombre && item.name.toLowerCase().indexOf(collNombre.toLowerCase()) === -1){
                return false;
            }
            if (collDescripcion && item.description.toLowerCase().indexOf(collDescripcion.toLowerCase()) === -1){
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