import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sName:string, nameValue:string): any {
    if (sName === "") return value;
    
    const array: any[] = [];
    for (const item of value) {
        let name: string = item[nameValue];
        name = name.toLowerCase();
        if (name.includes(sName)) {
            array.push(item);
        }
    }
    return array;
}
}
