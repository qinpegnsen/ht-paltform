import { Injectable } from '@angular/core';
import {isNull} from "util";
import {AjaxService} from "../../../core/services/ajax.service";
const swal = require('sweetalert');
@Injectable()
export class AdddataService {

  constructor(private ajax: AjaxService) { }

  getaddData(requestData) {
    let result;
    this.ajax.post({
      url: "/datadict/addDatadictType",
      data: requestData,
      async: false,
      success: (res) => {
        console.log(res)
        if (res.success && !isNull(res.data)) {
          result = res.data;
        }else{
          console.log(123)
        }
      },
      error: (res) => {
        console.log('res', res);
      }
    });
    return result;
  }

  /**
   * t通过id查询分类
   * @param url
   * @param data
   * @returns {any}
   */
  public queryClassById(url,data) {
    var result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            result=data.data;
            let info=data.info;
          }else{
            console.log('article/queryAllArticle 返回的success为假');
          }
        }else{
          console.log('article/queryAllArticle 返回的数据为空');
        }
      },
      error: () => {
        swal('失败','','error')
      }
    });
    return result
  }

  public addClass(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            result=data.info;
            swal(result,'','success')
          }else{
            console.log('article/queryAllArticle 返回的success为假');
          }
        }else{
          console.log('article/queryAllArticle 返回的数据为空');
        }
      },
      error: (data) => {
        swal('分类用户已存在','','error')
      }
    });
  }

  public updateClass(url,data) {
    var result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            result=data.data;
            let info=data.info;
            swal(info,'','success')
          }else{
            console.log('article/queryAllArticle 返回的success为假');
          }
        }else{
          console.log('article/queryAllArticle 返回的数据为空');
        }
      },
      error: (data) => {
        swal('修改用户失败','','error')
      }
    });
    return result
  }

}
