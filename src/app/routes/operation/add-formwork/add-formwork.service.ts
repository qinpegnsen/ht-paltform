import { Injectable } from '@angular/core';
import {AppComponent} from "../../../app.component";
import {AjaxService} from "../../../core/services/ajax.service";

@Injectable()
export class AddFormworkService {

  constructor(private ajax: AjaxService) { }

  /**
   * 删除运费模板信息
   * @param url
   * @param data
   */
  delCode(url,data) {
    this.ajax.del({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        console.log('连接数据库失败');
      }
    });
  }

}

/**
 * 模板区域选择对象
 */
@Injectable()
export class Area {
  areaCode: string;    // 区域编码
  areaName: string;    // 区域名字
  isSelect: boolean;   // 是否以被选择
  tplId: number;        //模板值ID
  children: Array<Area>;  // 当前区域下子集
  selectNum: number;     // 已选中数量
}

/**
 * 中国大区对象
 */
@Injectable()
export class ChinaArea {
  code: string;    // 大区编码
  name: string;    // 大区名字
  children: Array<Area>;  // 当前区域下子集
  isSelect: boolean;   // 是否以被选择
  tplId: number;        //模板值ID
}

/**
 * 模板值对象
 */
@Injectable()
export class TplVal {
  tplId: number;        //模板值ID
  areaCodes: string; // 选中的区域编码
  firstNum: number;   // 首件
  firstPrice: number; // 首费（元）
  addAttach: number;  // 续件（件）
  addPrice: number;   // 续费（元）
}

