import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {PatternService} from "../../../../core/forms/pattern.service";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {AuditListComponent} from "../audit-list/audit-list.component";
import {ActivatedRoute} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-audit-window',
  templateUrl: './audit-window.component.html',
  styleUrls: ['./audit-window.component.scss']
})
export class AuditWindowComponent implements OnInit, OnDestroy {
  public isAgree: string = 'Y';         //默认是通过
  public showRecord: boolean = true;         //默认是通过
  public yesOrNo: any;         //商品审核是否通过枚举
  public isAudit: boolean = true;//是否是审核，父组件监听用
  public brandId: string;//品牌id
  public brandInfo: any = {};

  public applyCode:any;//品牌编码
  public brandName:any;//品牌名称
  public englishName:any;//品牌英文名称
  public brandHolder:any;//品牌拥有着
  public applyNumber:any;//品牌注册号

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
    $('body').css("overflow-y", 'scroll');
  }

  constructor(public submit: SubmitService,
              public location: Location,
              public tools: RzhtoolsService,
              public routeInfo: ActivatedRoute,
              public patterns: PatternService,
) {
    $('.wrapper > section').css('z-index', 200);
    $('body').css("overflow-y", 'hidden');
  }

  ngOnInit() {
    let me=this;
    me.applyCode = this.routeInfo.snapshot.queryParams['applyCode'];
    me.brandName = this.routeInfo.snapshot.queryParams['brandName'];
    me.englishName = this.routeInfo.snapshot.queryParams['englishName'];
    me.brandHolder = this.routeInfo.snapshot.queryParams['brandHolder'];
    me.applyNumber = this.routeInfo.snapshot.queryParams['applyNumber'];
    this.yesOrNo = this.tools.getEnumDataList('1001');  // 商品审核是否通过
  }

  hideWindow() {
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


  /**
   * 改变是否成功
   */
  changeIsAgree(isAgree) {
    if (isAgree == 'Y') {
      this.isAgree = 'N';
      this.showRecord = false;
    } else {
      this.isAgree = 'Y';
      this.showRecord = true;
    }
  }


  /**
   *品牌审核通过
   */
  successBrand(res) {
    let me = this;
    let url = "/goodsBrandApply/auditPass";
    let data = {
      applyCode:me.applyCode,
      brandSort:res.brandSort,
      brandRecommend:res.brandRecommend,
      showType:res.showType,
      goodsBrandState:res.state
    }
    let result = this.submit.putRequest(url, data);
    this.location.back();
  }

  /**
   * 品牌审核失败
   */
  failBrand(res) {
    let me = this;
    let url = "/goodsBrandApply/auditReject";
    let data = {
      applyCode:me.applyCode,
      reason:res.failReason
    }
    let result = this.submit.putRequest(url, data);
    this.location.back();
    // me.auditList.queryDatas()
  }
}
