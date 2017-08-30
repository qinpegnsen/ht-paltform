import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {
  constructor(private sanitizer : DomSanitizer){

  }

  transform(value: any, args?: any): any {
    console.log("█ value._file ►►►",  value._file);
    let src, url = window.URL;
    if(url){
      src = url.createObjectURL(value._file);
    }
    return this.sanitizer.bypassSecurityTrustUrl(src);
  }

}
