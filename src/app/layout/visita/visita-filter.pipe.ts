import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class VisitaFilterPipe implements PipeTransform {
    transform(items: any[], visObservacion: string, visCliente: string, visEmpleado: string, visEstatus: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (visObservacion && item.observation.toLowerCase().indexOf(visObservacion.toLowerCase()) === -1){
                return false;
            }
            if (visCliente && item.client.firstName.toLowerCase().indexOf(visCliente.toLowerCase()) === -1){
                return false;
            }
            if (visEmpleado && item.employee.firstName.toLowerCase().indexOf(visEmpleado.toLowerCase()) === -1){
                return false;
            }
            if (visEstatus && item.request.status.toLowerCase().indexOf(visEstatus.toLowerCase()) === -1){
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