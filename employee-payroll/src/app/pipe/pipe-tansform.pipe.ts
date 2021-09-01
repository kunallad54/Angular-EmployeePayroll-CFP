import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTansform'
})
export class PipeTansformPipe implements PipeTransform {

  /**
   * Purpose: To pipe date and transform it in desired format
   * 
   * @param value actual format of date
   * @returns desired format of date
   */
  transform(value: string | null){
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value,'dd MMM yyyy');
    return value;
  }

}
