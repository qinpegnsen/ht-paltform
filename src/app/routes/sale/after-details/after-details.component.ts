import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {MaskService} from "../../../core/services/mask.service";
import {AfterService} from "../after.service";

@Component({
  selector: 'app-refund-details',
  templateUrl: './after-details.component.html',
  styleUrls: ['./after-details.component.scss']
})
export class AfterDetailsComponent implements OnInit {

  private afterType:string;//售后类型
  private afterNo:string;//售后编码
  private afterData:string;//售后详情数据
  constructor(private router:Router,
              private submit: SubmitService,
              private after: AfterService,
              private tools: RzhtoolsService) { }

  ngOnInit() {
    let me=this;
    me.afterType = me.submit.getParams('afterType');
    me.afterNo = me.submit.getParams('afterNo');

    this.afterData = this.after.getAfterDetail(me.afterNo);

  }

  /**
   * 审核商品
   */
  audit() {
    let me = this;
    MaskService.showMask();//显示遮罩层
  }

}
