import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {
  constructor(private sanitizer : DomSanitizer){

  }

  transform(value: File, args?: any): any {
    let src, url = window.URL;
    if(url){
      src = url.createObjectURL(value);// 创建本地路径
    }
    // 解决angular中本地blob路径"unsafe"错误
    return this.sanitizer.bypassSecurityTrustUrl(src);
  }

}
