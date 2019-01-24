import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class ContratoFilterPipe implements PipeTransform {
    transform(items: any[], conFolio: string, conElaboracion: string, conFecha: string, conCliente: string, conAgente: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (conFolio && item.folioNumber.toLowerCase().indexOf(conFolio.toLowerCase()) === -1){
                return false;
            }
            if (conElaboracion && item.elaborationDate.toLowerCase().indexOf(conElaboracion.toLowerCase()) === -1){
                return false;
            }
            if (conFecha && item.firmDate.toLowerCase().indexOf(conFecha.toLowerCase()) === -1){
                return false;
            }
            if (conCliente && item.client.firstName.toLowerCase().indexOf(conCliente.toLowerCase()) === -1){
                return false;
            }
            if (conAgente && item.agent.firstName.toLowerCase().indexOf(conAgente.toLowerCase()) === -1){
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