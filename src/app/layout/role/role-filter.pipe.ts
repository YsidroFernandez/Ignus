import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'searchfilter'
  })

  export class RoleFilterPipe implements PipeTransform {
    transform(items: any[], rolName: string, rolDescription: string) {
      if (items && items.length){
        return items.filter(item =>{
            if (rolName && item.name.toLowerCase().indexOf(rolName.toLowerCase()) === -1){
                return false;
            }
            if (rolDescription && item.description.toLowerCase().indexOf(rolDescription.toLowerCase()) === -1){
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
