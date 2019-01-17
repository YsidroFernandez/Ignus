import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class VisitaFilterPipe implements PipeTransform {
    transform(items: any[], visCodigo: string, visCliente: string, visEvaluador: string, visEstado: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (visCodigo && item.client.firstName.toLowerCase().indexOf(visCodigo.toLowerCase()) === -1){
                return false;
            }
            if (visCliente && item.client.lastName.toLowerCase().indexOf(visCliente.toLowerCase()) === -1){
                return false;
            }
            if (visEvaluador && item.client.identification.toLowerCase().indexOf(visEvaluador.toLowerCase()) === -1){
                return false;
            }
            if (visEstado && item.typeService.name.toLowerCase().indexOf(visEstado.toLowerCase()) === -1){
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