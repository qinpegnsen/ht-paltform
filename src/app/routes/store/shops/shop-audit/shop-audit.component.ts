import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {StoreService} from "../../store.service";
import {MaskService} from "../../../../core/services/mask.service";
declare var $: any;

@Component({
  selector: 'app-shop-audit',
  templateUrl: './shop-audit.component.html',
  styleUrls: ['./shop-audit.component.scss']
})
export class ShopAuditComponent implements OnInit {
  public refresh: boolean = false;//是否审核，以此判断父页面是否需要刷新
  public storeCode: string;//店铺编码
  public shopInfo: any;//店铺信息
  public shopAudits: any;//审核结果枚举
  public audit: any = {};//审核结果

  constructor(public location: Location,
              public storeService: StoreService,
              public submitService: SubmitService) {
  }

  ngOnInit() {
    let me = this, shopInfo;
    me.storeCode = me.submitService.getParams('storeCode');
    if (me.storeCode) shopInfo = me.storeService.getShopInfo(me.storeCode);
    if (!isNullOrUndefined(shopInfo)) me.shopInfo = shopInfo;
    me.shopAudits = [{key: 'PASS', val: '通过'}, {key: 'UNPASS', val: '不通过'}];  // 审核是否通过
    me.audit.auditResult = 'UNPASS';//默认不通过
  }

  /**
   * 审核
   */
  auditShop(){
    let me = this;
    MaskService.showMask();//显示遮罩层
    let data = {
      storeCode: me.storeCode,
      auditResult: me.audit.auditResult,
      opinion: me.audit.opinion
    }
    me.submitService.putRequest('/stores/auditStore', data, true);
    me.refresh = true;
  }


  back() {
    this.location.back();
  }


  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

}

