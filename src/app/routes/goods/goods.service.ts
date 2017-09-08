import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
import {MaskService} from "../../core/services/mask.service";
import {Router} from "@angular/router";
const swal = require('sweetalert');

@Injectable()
export class GoodsService {

  constructor(private ajax: AjaxService,private mask: MaskService,private router: Router,) { }
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
}
