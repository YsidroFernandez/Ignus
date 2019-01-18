import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class ReservaFilterPipe implements PipeTransform {
    transform(items: any[], resTrans: string, resInmueble: string, resFecha: string, resTranspro: string, resInmueblepro: string, resFechapro: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (resTrans && item.nameForEmployee.toLowerCase().indexOf(resTrans.toLowerCase()) === -1){
                return false;
            }
            if (resInmueble && item.property.nameDisplay.toLowerCase().indexOf(resInmueble.toLowerCase()) === -1){
                return false;
            }
            if (resFecha && item.request.requestDate.toLowerCase().indexOf(resFecha.toLowerCase()) === -1){
                return false;
            }
            if (resTranspro && item.nameForEmployee.toLowerCase().indexOf(resTranspro.toLowerCase()) === -1){
                return false;
            }
            if (resInmueblepro && item.property.nameDisplay.toLowerCase().indexOf(resInmueblepro.toLowerCase()) === -1){
                return false;
            }
            if (resFechapro && item.request.requestDate.toLowerCase().indexOf(resFechapro.toLowerCase()) === -1){
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
