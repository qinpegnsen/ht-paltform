import {Component, OnInit} from "@angular/core";
import {OrdersComponent} from "../orders.component";
import {SubmitService} from "../../../../core/forms/submit.service";
import {OrdersService} from "../orders.service";
import {isNullOrUndefined} from "util";
import {AppComponent} from "../../../../app.component";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  constructor(private parentComp: OrdersComponent,
              public ordersService: OrdersService,
              private submit: SubmitService) {
  }

  public orderStep = 1;
  public curOrdno: string;
  public orderStates: any;
  public logisticsInfo: any;
  public orderDetailData: any;
  public curDeliverOrderId: string;
  public goodsData: any;

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 'detail';
    me.curOrdno = me.submit.getParams('ordno');
    me.getOrderDetailInfo();//获取订单的物流详情及订单进度
    me.getOrderDetail(); //获取订单详情
  }

  /**
   * 获取订单详情
   */
  getOrderDetail() {
    let me = this;
    let result = me.ordersService.getOrderDetailByNO(me.curOrdno);
    if (!isNullOrUndefined(result)) {
      me.orderDetailData = result;
      me.goodsData = result.ordItemList;
    }
  }

  /**
   * 显示订单状态的时间列表
   * @param target
   */
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
    let me = this, ordno = me.submit.getParams('ordno');
    let orderStatesDetail = me.ordersService.getOrderState(ordno);
    me.orderStates = orderStatesDetail.orderStates;
    me.logisticsInfo = orderStatesDetail.orderLogistics;
    me.getOrderStep();
  }

  /**
   * 获取订单当前进度
   */
  private getOrderStep() {
    let me = this, temp = [];
    for (let state of me.orderStates) {
      if (state.state == 'SUCCESS') {
        temp.push(5);
      } else if (state.state == 'DELIVERY') {
        temp.push(4);
      } else if (state.state == 'PREPARE') {
        temp.push(3);
      } else if (state.state == 'PAID') {
        temp.push(2);
      } else if (state.state == 'CR') {
        temp.push(1);
      }
    }
    temp.sort();//排列
    me.orderStep = temp[temp.length - 1];//当前进度为数组中最大的一个
  }

  /**
   * 发货
   * @param orderId
   */
  deliverOrder() {
    this.curDeliverOrderId = this.curOrdno;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(data) {
    this.curDeliverOrderId = null;
    if(data.type) {
      AppComponent.rzhAlt('success','操作成功');
      this.getOrderDetailInfo();//获取订单的物流详情及订单进度
      this.getOrderDetail(); //获取订单详情
    }
  }

}


