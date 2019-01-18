import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class TipespecificationFilterPipe implements PipeTransform {
    transform(items: any[], tyspeNombre: string,tyspeDescripcion: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (tyspeNombre && item.name.toLowerCase().indexOf(tyspeNombre.toLowerCase()) === -1){
                return false;
            }
            if (tyspeDescripcion && item.description.toLowerCase().indexOf(tyspeDescripcion.toLowerCase()) === -1){
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