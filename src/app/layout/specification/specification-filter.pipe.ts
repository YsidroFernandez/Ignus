import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class SpecificationFilterPipe implements PipeTransform {
    transform(items: any[], spenombre: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (spenombre && item.name.toLowerCase().indexOf(spenombre.toLowerCase()) === -1){
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