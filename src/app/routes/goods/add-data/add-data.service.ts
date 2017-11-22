import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../core/page/page";
import {AppComponent} from "../../../app.component";

@Injectable()
export class AddDataService {

  constructor(public ajax: AjaxService) { }

  /**
   * @param data
   * @param url
   * @returns {Page}
   */
  addGoodsBaseEnum(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        result=res.success;
        if (res.success) {
          AppComponent.rzhAlt("success",res.info);
        }else{
          AppComponent.rzhAlt("error",res.info);
        }
      },
      error: (res) => {
        result='';
        AppComponent.rzhAlt("error",res.info);
      }
    });
    return result;
  }
  // public addGoodsBaseEnum(url,data) {
  //   var result;
  //   this.ajax.post({
  //     url: url,
  //     data: data,
  //     async:false,
  //     success: (data) => {
  //       if (!isNull(data)) {
  //         if(data.success==true){
  //           result=new Page(data.data);
  //           if (data.success) {
  //             AppComponent.rzhAlt("success",data.info);
  //           }else{
  //             AppComponent.rzhAlt("error",data.info);
  //           }
  //         }else{
  //           AppComponent.rzhAlt("error", data.info);
  //         }
  //       }else{
  //         AppComponent.rzhAlt("error", data.info);
  //       }
  //     },
  //     error: () => {
  //       result='';
  //       AppComponent.rzhAlt("error", data.info);
  //     }
  //   });
  //   return result;
  // }
}
