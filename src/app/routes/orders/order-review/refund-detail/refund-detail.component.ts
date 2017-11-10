import { Component, OnInit } from '@angular/core';
import {OrderReviewComponent} from "../order-review.component";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-refund-detail',
  templateUrl: './refund-detail.component.html',
  styleUrls: ['./refund-detail.component.scss']
})
export class RefundDetailComponent implements OnInit {
  public ordno;  //订单号
  public refund;
  constructor(public orderReviewComponent:OrderReviewComponent,public submit: SubmitService,
              public routeInfo:ActivatedRoute,) { }

  ngOnInit() {
    let me=this;
    me.orderReviewComponent.orderType = 111;
    this.ordno = me.routeInfo.snapshot.queryParams['ordno'];//获取进货记录未付款页面跳转过来的参数
    this.queryRefund();
  }

  /**
   * 查询退款详情
   */
  queryRefund() {
      let url = '/agentOrd/queryRefundDetails';
      let data = {
        ordno:this.ordno
      }
      this.refund=this.submit.getRequest(url, data);
    }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY -40) + 'px';
    target.style.left = (event.clientX + 40) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

}
