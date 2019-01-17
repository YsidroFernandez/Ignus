import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class AssignPromotionsFilterPipe implements PipeTransform {
    transform(items: any[], assName: string, assDescription: string, assCantidad: string, assEstado: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (assName && item.name.toLowerCase().indexOf(assName.toLowerCase()) === -1){
                return false;
            }
            if (assDescription && item.description.toLowerCase().indexOf(assDescription.toLowerCase()) === -1){
                return false;
            }
            if (assCantidad && item.description.toLowerCase().indexOf(assCantidad.toLowerCase()) === -1){
                return false;
            }
            if (assEstado && item.properties.length.toLowerCase().indexOf(assEstado.toLowerCase()) === -1){
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
