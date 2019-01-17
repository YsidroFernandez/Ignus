import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class IncidenciasFilterPipe implements PipeTransform {
    transform(items: any[], IncFecha: string, IncTransaccion: string, IncMotivo: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (IncFecha && item.date.toLowerCase().indexOf(IncFecha.toLowerCase()) === -1){
                return false;
            }
            if (IncTransaccion && item.transaction.nameForEmployee.toLowerCase().indexOf(IncTransaccion.toLowerCase()) === -1){
                return false;
            }
            if (IncMotivo && item.description.toLowerCase().indexOf(IncMotivo.toLowerCase()) === -1){
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