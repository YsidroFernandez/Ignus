import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class ListransactionsFilterPipe implements PipeTransform {
    transform(items: any[], listraDescripcion: string, listraEstatus: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (listraDescripcion && item.nameForEmployee.toLowerCase().indexOf(listraDescripcion.toLowerCase()) === -1){
                return false;
            }
            if (listraEstatus && item.status.toLowerCase().indexOf(listraEstatus.toLowerCase()) === -1){
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