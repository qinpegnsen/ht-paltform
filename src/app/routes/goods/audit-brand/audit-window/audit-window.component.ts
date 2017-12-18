import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {PatternService} from "../../../../core/forms/pattern.service";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {AuditListComponent} from "../audit-list/audit-list.component";
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

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
    $('body').css("overflow-y", 'scroll');
  }

  constructor(public submit: SubmitService,
              public location: Location,
              public tools: RzhtoolsService,
              public patterns: PatternService,
) {
    $('.wrapper > section').css('z-index', 200);
    $('body').css("overflow-y", 'hidden');
  }

  ngOnInit() {
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
      applyCode:me.brandId,
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
      applyCode:me.brandId,
      reason:res.failReason
    }
    let result = this.submit.putRequest(url, data);
    this.location.back();
    // me.auditList.queryDatas()
  }
}
