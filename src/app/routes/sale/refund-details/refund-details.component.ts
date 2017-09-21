import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {MaskService} from "../../../core/services/mask.service";

@Component({
  selector: 'app-refund-details',
  templateUrl: './refund-details.component.html',
  styleUrls: ['./refund-details.component.scss']
})
export class RefundDetailsComponent implements OnInit {

  private linkType:string;
  private goodsAudits:any;  //商品审核状态
  private audit: any;   // 商品审核
  private goodsBaseCode: string;  //商品基本编码
  constructor(private router:Router,private submit: SubmitService, private tools: RzhtoolsService) { }

  ngOnInit() {
    let me=this;
    me.linkType = me.submit.getParams('linkType');
    console.log("█ me.linkType ►►►",  me.linkType);

    me.goodsAudits = this.tools.getEnumDataList('1014');  // 商品审核状态列表
    // 去掉待审核状态
    for (var i = me.goodsAudits.length - 1; i >= 0; i--) {
      var obj = me.goodsAudits[i];
      if (obj.key == 'AUDIT') {
        me.goodsAudits.splice(i, 1)
      }
    }
    // 初始化默认审核状态
    me.audit = {
      opinion: '',
      result: 'PASS',
      goodsBaseCode: me.goodsBaseCode
    }
  }

  /**
   * 审核商品
   */
  auditGoods() {
    let me = this;
    MaskService.showMask();//显示遮罩层
    // me.submit.putRequest('/goodsEdit/auditGoods', me.audit, true)
  }
}
