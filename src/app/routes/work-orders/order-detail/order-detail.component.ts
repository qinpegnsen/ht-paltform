import {Component, OnInit} from "@angular/core";
import {isNullOrUndefined} from "util";
import {OrdersService} from "../../orders/orders/orders.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {AppComponent} from "../../../app.component";
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  constructor(private parentComp: WoManageComponent,
              public ordersService: OrdersService,
              private submit: SubmitService) {
  }

  public orderStep = 1;
  public curOrdno: string;
  public orderStates: any;
  public orderDetailData: any;
  public curDeliverOrderId: string;
  public goodsData: any;
  private atime:Array<string> = new Array();

  ngOnInit() {
    let me = this;
    me.parentComp.detail = true;
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
      me.getOrderStep();
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
   * 获取订单进度
   */
  private getOrderDetailInfo() {
    let me = this, ordno = me.submit.getParams('ordno');
    let orderStatesDetail = me.ordersService.getOrderState(ordno);
    if(!isNullOrUndefined(orderStatesDetail)) me.orderStates = orderStatesDetail;
    for (let item of me.orderStates){
      if (item.state == 'SUCCESS') {
        me.atime[5] = item.acceptTime;
      } else if (item.state == 'DELIVERY') {
        me.atime[4] = item.acceptTime;
      } else if (item.state == 'PREPARE') {
        me.atime[3] = item.acceptTime;
      } else if (item.state == 'PAID') {
        me.atime[2] = item.acceptTime;
      } else if (item.state == 'CR') {
        me.atime[1] = item.acceptTime;
      }
    }
  }

  /**
   * 获取订单当前进度
   */
  private getOrderStep() {
    let me = this, temp = [];
    if (me.orderDetailData.state == 'SUCCESS') {
      me.orderStep = 5;
    } else if (me.orderDetailData.state == 'DELIVERY') {
      me.orderStep = 4;
    } else if (me.orderDetailData.state == 'PREPARE') {
      me.orderStep = 3;
    } else if (me.orderDetailData.state == 'PAID') {
      me.orderStep = 2;
    } else if (me.orderDetailData.state == 'CR') {
      me.orderStep = 1;
    }
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


