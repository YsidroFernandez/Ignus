import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class PromotionsFilterPipe implements PipeTransform {
    transform(items: any[], promName: string, promDescripcion: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (promName && item.name.toLowerCase().indexOf(promName.toLowerCase()) === -1){
                return false;
            }
            if (promDescripcion && item.description.toLowerCase().indexOf(promDescripcion.toLowerCase()) === -1){
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