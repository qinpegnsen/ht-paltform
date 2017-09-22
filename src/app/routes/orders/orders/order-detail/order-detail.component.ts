import {Component, OnInit} from '@angular/core';
import {OrdersComponent} from "../orders.component";
import {SubmitService} from "../../../../core/forms/submit.service";
import {isNullOrUndefined} from "util";
import {OrdersService} from "../orders.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  constructor(private parentComp: OrdersComponent,
              public ordersService:OrdersService,
              private submit: SubmitService) {
  }

  public orderStep = 0;
  public orderStates:any;
  public logisticsInfo:any;

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 100;
    me.getOrderDetailInfo();//获取订单的物流详情及订单进度
  }

  showTimeList(target) {
    target.style.display = 'block';
  }

  hideTimesList(target) {
    target.style.display = 'none';
  }

  /**
   * 获取订单的物流详情及订单进度
   */
  private getOrderDetailInfo() {
    let me = this,ordno = me.submit.getParams('ordno');
    let orderStatesDetail = me.ordersService.getOrderState(ordno);
    me.orderStates = orderStatesDetail.orderStates;
    me.logisticsInfo = orderStatesDetail.orderLogistics;
  }

}


