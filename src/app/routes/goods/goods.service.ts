import {Injectable} from "@angular/core";
import {isNullOrUndefined, isUndefined} from "util";
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
import {MaskService} from "../../core/services/mask.service";
import {Router} from "@angular/router";
import {SubmitService} from "../../core/forms/submit.service";
import {SettingsService} from "../../core/settings/settings.service";
const swal = require('sweetalert');

@Injectable()
export class GoodsService {

  constructor(private ajax: AjaxService,
              private mask: MaskService,
              private router: Router,
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
  publishGoods(requestUrl: string, requestData: any){
    let me = this;
    me.ajax.post({
      url: requestUrl,
      data: JSON.stringify(requestData),
      async: false,
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          me.mask.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          me.router.navigate(['/main/goods/publish/step_three'],{queryParams: {baseCode: res.data}})
        } else {
          me.mask.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          let errorMsg;
          if (isNullOrUndefined(res.data)) {
            errorMsg = res.info
          } else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
          AppComponent.rzhAlt("error", res.info, errorMsg);
        }
      },
      error: (res) => {
        me.mask.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
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
    let requestUrl = '/goodsKind/queryGoodsKindPageByParentId';
    let requestData = {
      curPage: 1,
      pageSize: 100,
      kindParentId: kindId
    };
    return this.submit.getData(requestUrl, requestData).voList;
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
          me.mask.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          if (back) this.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          swal({
           title: '成功',
           text: res.info,
           type: 'success',
           timer: 3000, //关闭时间，单位：毫秒
           showConfirmButton: false  //不显示按钮
           });
          result = res.data;
        } else {
          me.mask.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          let errorMsg;
          if (isNullOrUndefined(res.data)) {
            errorMsg = res.info
          } else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
          AppComponent.rzhAlt("error", res.info, errorMsg);
        }
      },
      error: (res) => {
        me.mask.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
        AppComponent.rzhAlt("error", '网络错误');
        console.log('put error', res);
      }
    });
    return result;
  }


  /**
   * 根据店铺编码获取物流模板
   * @returns {any}
   */
  getExpressTplByStoreCode(){
    let me = this, storeCode;
    let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    if(isNullOrUndefined(loginInfo)){
      AppComponent.rzhAlt('warning','请登录后重试')
      return null;
    }else if(!isNullOrUndefined(loginInfo.storeCode)){
      // storeCode = loginInfo.storeCode;
      storeCode = 'SZH_PLAT_SELF_STORE';
      return me.submit.getData('/expressTpl/queryByStoreCode',{storeCode: storeCode})
    }
  }

  /**
   * 根据运费模板ID获取运费模板值
   * @param tplId   运费模板ID
   * @returns {any}   运费模板值
   */
  getTplVal(tplId){
    let me = this;
    let tpls = me.getExpressTplByStoreCode();
    console.log("█ tplId ►►►",  tplId);
    for(let tpl of tpls){
      if(tpl.id == tplId){
        return tpl;
      }
    }
  }

}
