import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sName:string, nameValue:string): any {
    if(sName=="") return value;
    const array:any[]=[];
    for(let i=0;i<value.length;i++){
      let name:string=value[i][nameValue];
      name=name.toLowerCase();
      if(name.includes(sName)){
       array.push(value[i]);
      }
    }
    return array;
}
}