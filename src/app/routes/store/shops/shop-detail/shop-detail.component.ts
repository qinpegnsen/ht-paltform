import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {StoreService} from "../../store.service";
import {ShopsComponent} from "../shops.component";
declare var $: any;

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
  public refresh: boolean = false;//是否审核，以此判断父页面是否需要刷新
  public storeCode: string;//店铺编码
  public shopInfo: any;//店铺信息
  public audit: any = {};//审核结果
  public auditRecords: any = {};//审核记录

  constructor(public location: Location,
              public storeService: StoreService,
              public submitService: SubmitService,
              public parentComp: ShopsComponent) {
    this.parentComp.storeState = 'detail';
  }

  ngOnInit() {
    let me = this, shopInfo, auditRecords;
    me.storeCode = me.submitService.getParams('storeCode');
    if (me.storeCode) {
      shopInfo = me.storeService.getShopInfo(me.storeCode);
      auditRecords = me.storeService.getShopAuditRecord(me.storeCode);
    }
    if (!isNullOrUndefined(shopInfo)) me.shopInfo = shopInfo;
    if (!isNullOrUndefined(auditRecords)) me.auditRecords = auditRecords;
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


