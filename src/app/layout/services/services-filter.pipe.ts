import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class ServicesFilterPipe implements PipeTransform {
    transform(items: any[], servName: string, servDescription: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (servName && item.name.toLowerCase().indexOf(servName.toLowerCase()) === -1){
                return false;
            }
            if (servDescription && item.description.toLowerCase().indexOf(servDescription.toLowerCase()) === -1){
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