import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class ActivitiesFilterPipe implements PipeTransform {
    transform(items: any[], actNombre: string, actDescripcion: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (actNombre && item.name.toLowerCase().indexOf(actNombre.toLowerCase()) === -1){
                return false;
            }
            if (actDescripcion && item.description.toLowerCase().indexOf(actDescripcion.toLowerCase()) === -1){
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