import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class LisincidencesFilterPipe implements PipeTransform {
    transform(items: any[], lisincFecha: string, lisincCliente: string, lisincTransaccion: string, lisincAsunto: string, lisincDecision: string, lisincEstatus: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (lisincFecha && item.date.toLowerCase().indexOf(lisincFecha.toLowerCase()) === -1){
                return false;
            }
            if (lisincCliente && item.transaction.client.firstName.toLowerCase().indexOf(lisincCliente.toLowerCase()) === -1){
                return false;
            }
            if (lisincTransaccion && item.transaction.nameForEmployee.toLowerCase().indexOf(lisincTransaccion.toLowerCase()) === -1){
                return false;
            }
            if (lisincAsunto && item.name.toLowerCase().indexOf(lisincAsunto.toLowerCase()) === -1){
                return false;
            }
            if (lisincDecision && item.decision.toLowerCase().indexOf(lisincDecision.toLowerCase()) === -1){
                return false;
            }
            if (lisincEstatus && item.status.toLowerCase().indexOf(lisincEstatus.toLowerCase()) === -1){
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