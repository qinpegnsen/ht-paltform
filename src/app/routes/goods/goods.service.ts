import {Injectable} from "@angular/core";
import {isNullOrUndefined, isUndefined} from "util";
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
import {MaskService} from "../../core/services/mask.service";
import {Router} from "@angular/router";
import {SubmitService} from "../../core/forms/submit.service";
import {SettingsService} from "../../core/settings/settings.service";
import {Location}from '@angular/common';
const swal = require('sweetalert');
declare var $: any;

@Injectable()
export class GoodsService {

  static goodsUploader: string = "upload/basic/goodsUpload";//商品上传，需要uuid, 返回URL，带HTTP
  static goodsUploadRetHttpURL: string = "upload/basic/goodsUploadRetHttpURL";//商品 返回URL，带HTTP
  static goodsUploadRetUrl: string = "upload/basic/goodsUploadRetUrl";//商品 返回URL，不带HTTP

  constructor(public ajax: AjaxService,
              public mask: MaskService,
              public router: Router,
              public location: Location,
              public settings: SettingsService,
              public submit: SubmitService) {
  }

  /**
   * 获取店铺是否改变的算法编码
   * @returns {any}
   */
  getStoresMd5() {
    return this.submit.getData("/stores/loadStoreMD5", '');
  }

  /**
   * 获取店铺列表
   */
  getAllStores() {
    let allStores: Array<any> = new Array(), //所有店铺，格式是选择组件的格式
      storesData: any,//接口请求到的店铺数据
      localMd5 = localStorage.getItem('storeMd5'),//本地缓存的店铺信息编码
      localStores = localStorage.getItem('allStores');//本地缓存的店铺数据
    if (localMd5 && localMd5 == this.getStoresMd5() && localStores) {
      allStores = JSON.parse(localStores);
    } else {
      storesData = this.submit.getData("/stores/queryAllNormal", '');
      if (storesData && storesData.storeList && storesData.md5) {
        let result = storesData.storeList, obj: any = {};
        result.forEach(item => {
          obj = {
            id: item.storeCode,
            text: item.storeName
          };
          allStores.push(obj);
        })
        localStorage.setItem('allStores', JSON.stringify(allStores));
        localStorage.setItem('storeMd5', storesData.md5);
      }
    }
    return allStores;
  }


  /**
   * get 获取数据
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  getSkuData(requestData: any) {
    let defer = $.Deferred(); //封装异步请求结果;
    this.ajax.post({
      url: '/goodsEdit/genesku',
      data: JSON.stringify(requestData),
      async: false,
      contentType: "application/json",
      success: (res) => {
        if (res.success) defer.resolve(res.data);
      },
      error: (res) => {
        console.log('错误', res);
      }
    });
    return defer.promise(); //返回异步请求信息
  }

  /**
   * 分类关联品牌
   */
  sortLinkKind(requestUrl: string, requestData: any) {
    let result: any;
    this.ajax.post({
      url: requestUrl,
      data: requestData,
      async: false,
      success: (res) => {
        result = res;
        if (!isNullOrUndefined(res) && res.success) {
          AppComponent.rzhAlt("success", res.info);
        } else {
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {

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
  publishGoods(requestUrl: string, requestData: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    me.ajax.post({
      url: requestUrl,
      data: JSON.stringify(requestData),
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          defer.resolve(res.data);
        } else {
          defer.resolve(false);
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          swal(res.info, '', 'error');
        }
      },
      error: (res) => {
        defer.resolve(false);
        MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
        AppComponent.rzhAlt("error", '网络错误');
      }
    })
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 获取分类列表
   */
  getKindList(parentId?: string) {
    if (isUndefined(parentId)) parentId = '';
    let url = '/goodsKind/queryGoodsByParentId';
    let data = {kindParentId: parentId};
    return this.submit.getData(url, data)
  }

  /**
   * 获取品牌列表
   */
  getBrandList(orderId) {
    let url = '/goodsBrand/queryAll', data;
    data = {
      goodsKindId: orderId
    };
    return this.submit.getData(url, data)
  }

  /**
   * 根据分类查询品牌列表
   * @param kindId
   */
  getBrandListByKind(kindId?) {
    if (isUndefined(kindId)) kindId = '';
    let requestUrl = '/goodsBrand/queryBrandPagesByNA';
    let requestData = {
      curPage: 1,
      pageSize: 100,
      kindId: kindId
    };
    let result = this.submit.getData(requestUrl, requestData);
    if (!isNullOrUndefined(result))  return result.voList;
    else AppComponent.rzhAlt('warning', '查询品牌列表失败')
  }

  /**
   * put 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  putRequest(requestUrl, requestDate, back?: boolean) {
    let result, me = this;
    this.ajax.put({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        //console.log("█ res ►►►", res);
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
          swal(res.info, '', 'error');
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
  getExpressTplByStoreCode(storeCode) {
    return this.submit.getData('/expressTpl/queryByStoreCode', {storeCode: storeCode})
  }

  /**
   * 上传编辑器图片
   * @param file
   */
  uploadImg = function (file: any) {
    let _this = this, ret: string, data: any = new FormData();
    data.append("limitFile", file);
    _this.ajax.post({
      url: GoodsService.goodsUploadRetHttpURL,
      data: data,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: (response) => {
        if (!isNullOrUndefined(response) && response.success) {
          ret = response.data;
        }
        if (!response.success) AppComponent.rzhAlt('error', response.info, file.name + '上传失败')
      },
      error: (response) => {
        AppComponent.rzhAlt('error', file.name + '上传失败', '')
      }
    });
    return ret;
  }
}
