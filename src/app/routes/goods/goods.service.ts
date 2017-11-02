import {Injectable} from "@angular/core";
import {isNullOrUndefined, isUndefined} from "util";
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
import {MaskService} from "../../core/services/mask.service";
import {Router} from "@angular/router";
import {SubmitService} from "../../core/forms/submit.service";
import {SettingsService} from "../../core/settings/settings.service";
import { Location }from '@angular/common';
const swal = require('sweetalert');

@Injectable()
export class GoodsService {

  constructor(private ajax: AjaxService,
              private mask: MaskService,
              private router: Router,
              public location: Location,
              private settings: SettingsService,
              private submit: SubmitService) { }
  /**
   * get 获取数据
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  getSkuData(requestUrl: string, requestData: any) {
    let result: any;
    this.ajax.post({
      url: requestUrl,
      data:  JSON.stringify(requestData),
      async: false,
      contentType: "application/json",
      success: (res) => {
        if (!isNullOrUndefined(res) && res.success) result = res;
      },
      error: (res) => {
        console.log('get data error', res);
      }
    });
    return result;
  }

  /**
   * 发布商品
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  publishGoods(requestUrl: string, requestData: any, type?:string){
    let me = this;
    me.ajax.post({
      url: requestUrl,
      data: JSON.stringify(requestData),
      async: false,
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          if(type == 'edit') {
            AppComponent.rzhAlt("success", '操作成功');
            me.location.back();
          }else{
            me.router.navigate(['/main/goods/publish/step_three'],{queryParams: {baseCode: res.data}})
          }
        } else {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          swal(res.info,'','error');
        }
      },
      error: (res) => {
        MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
        AppComponent.rzhAlt("error", '网络错误');
      }
    })
  }

  /**
   * 获取分类列表
   */
  getKindList(parentId?:string){
    if(isUndefined(parentId)) parentId = '';
    let url = '/goodsKind/queryGoodsByParentId';
    let data = {kindParentId: parentId};
    return this.submit.getData(url,data)
  }

  /**
   * 获取品牌列表
   */
  getBrandList(){
    let url = '/goodsBrand/queryAll';
    return this.submit.getData(url,'')
  }

  /**
   * 根据分类查询品牌列表
   * @param kindId
   */
  getBrandListByKind(kindId?){
    if(isUndefined(kindId)) kindId = '';
    let requestUrl = '/goodsBrand/queryBrandPagesByNA';
    let requestData = {
      curPage: 1,
      pageSize: 100,
      kindId: kindId
    };
    let result = this.submit.getData(requestUrl, requestData);
    if(!isNullOrUndefined(result))  return result.voList;
    else AppComponent.rzhAlt('warning','查询品牌列表失败')
  }

  /**
   * put 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  putRequest(requestUrl, requestDate, back?: boolean) {
    let result,me = this;
    this.ajax.put({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        console.log("█ res ►►►", res);
        if (res.success) {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          if (back) this.location.back()//返回上级路由
          swal({
           title: '成功',
           text: res.info,
           type: 'success',
           timer: 3000, //关闭时间，单位：毫秒
           showConfirmButton: false  //不显示按钮
           });
          result = res.data;
        } else {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          swal(res.info,'','error');
        }
      },
      error: (res) => {
        MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
        AppComponent.rzhAlt("error", '网络错误');
        console.log('put error', res);
      }
    });
    return result;
  }


  /**
   * 根据店铺编码获取运费模板
   * @returns {any}
   */
  getExpressTplByStoreCode(){
    let me = this, storeCode;
    let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    // console.log("█ loginInfo ►►►",  loginInfo);
    if(isNullOrUndefined(loginInfo)){
      AppComponent.rzhAlt('warning','未获取到店铺信息，请登录后重试');
      return null;
    }else if(!isNullOrUndefined(loginInfo.storeCode)){
      storeCode = loginInfo.storeCode;
      // storeCode = 'SZH_PLAT_SELF_STORE';
      return me.submit.getData('/expressTpl/queryByStoreCode',{storeCode: storeCode})
    }
  }

}
