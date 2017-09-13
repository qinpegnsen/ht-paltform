import { Injectable } from '@angular/core';

@Injectable()
export class ManageService {
  constructor() { }

  /**
   * 商品所有属性的模板
   * @param data  属性数据
   * @param name  商品名
   * @returns {string}
   */
  public skuTemplate(data,name){
    let me = this,_item = '';
    for(let item of data){
      let attrStr = '';
      for(let attr of item.goodsSavSetList){
        attrStr += `<dl class="font12 mb0"><dt class="inline">`+attr.attrName+`</dt>：<dd class="inline">`+attr.value+`</dd></dl>`
      };
      _item += `<tr class="item-bottom-border"><td class="position-relative p">
      <div class="goods-xs-img"><img width="100%" height="100%" src="`+item.goodsImage+`" alt=""></div>
      <div class="mb0 goods-xs-info"><div class="goods-name" href="javascript:;">`+attrStr+`</div></div></td>
      <td class="text-center">`+item.goodsPrice.price+`</td>
      <td class="text-center">`+item.storageNum+`</td>
      </tr>`
    }
    let skuTemplate = `<div class="mask fadeIn sku-box">
      <div class="popup animated fadeIn">
        <div class="pop popup-hd font14">
          查看商品<span class="font16">“`+name+`”</span>的规格
        <div class="popup-colse unselectable">×</div>
        </div>
        <div class="pop popup-bd p">
        <table class="w100" style="max-height: 500px">
        <thead class="bg-gray-lighter">
        <tr>
          <td class="col-xs-8 p">商品规格</td>
        <td class="col-xs-2 p text-center">价格</td>
        <td class="col-xs-2 p text-center">库存</td>
        </tr>
        </thead>
        <tbody>`+_item+`</tbody>
        </table>
        </div>
        <div class="pop popup-ft"></div>
      </div>
      </div>
      `
    return skuTemplate;
  }
}
