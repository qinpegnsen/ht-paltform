import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";
const swal = require('sweetalert');


@Injectable()
export class AddArticleSortService {

  constructor(private ajax: AjaxService) { }

  /**
   * 新增文章分类
   * @param url
   * @param data
   */
  public addClass(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success){
            result=data.info;
            swal(result,'','success')
          }else{
            console.log('新增文章分类 返回的success为假');
          }
        }else{
          console.log('新增文章分类 返回的数据为空');
        }
      },
      error: (data) => {
        swal('分类用户已存在','','error')
      }
    });
  }

  /**
   * 通过id查询分类
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
          if(data.success){
            result=data.data;
            let info=data.info;
          }else{
            console.log('通过id查询分类 返回的success为假');
          }
        }else{
          console.log('通过id查询分类 返回的数据为空');
        }
      },
      error: () => {
        swal('失败','','error')
      }
    });
    return result
  }

  /**
   * 修改类别
   * @param url
   * @param data
   * @returns {any}
   */
  public updateClass(url,data) {
    var result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success){
            result=data.data;
            let info=data.info;
            swal(info,'','success')
          }else{
            console.log('修改类别 返回的success为假');
          }
        }else{
          console.log('修改类别 返回的数据为空');
        }
      },
      error: (data) => {
        swal('修改用户失败','','error')
      }
    });
    return result
  }


}
