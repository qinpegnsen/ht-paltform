import {Component, OnInit} from "@angular/core";
import {isNullOrUndefined} from "util";
import {OrdersService} from "../../orders/orders/orders.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {WoManageComponent} from "../wo-manage/wo-manage.component";
declare var $:any;

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
  public remark: string;
  public hasDeliverData:boolean = false;
  public expressData:any;
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
   * 显示备注编辑框
   * @param target
   */
  dropdownToggle(target){
    $(target).show()
  }

  /**
   * 输入框计数器
   */
  counter(target) {
    let obj = $(target);
    let hadLength = obj.val().length;
    let leaveLength = 100 - hadLength;
    obj.parents('.mea-text').find('.counter').html(leaveLength);
    return hadLength;
  }
  /**
   * 隐藏移动端文本编辑框
   * @param target
   */
  hideEdit(target) {
    $(target).fadeOut(200);
  }

  /**
   * 更新备注
   * @param target
   */
  editPrimary(target){
    let data = {
      ordno: this.curOrdno,
      remark: this.remark
    }
    this.ordersService.addRemark(data);
    this.getOrderDetail(); //获取订单详情
    this.hideEdit(target);
  }


  /**
   * 是否是当前状态
   * @param index
   * @returns {boolean}
   */
  ifCurrent(index:number){
    let me = this;
    switch (index){
      case 1:
        return true;
      case 2:
        if(me.orderStep==2 || me.orderStep==3 || me.orderStep==4 || me.orderStep==5) return true;
      case 3:
        if(me.orderStep==3 || me.orderStep==4 || me.orderStep==5) return true;
      case 4:
        if(me.orderStep==4 || me.orderStep==5) return true;
      case 5:
        if(me.orderStep==5) return true;
      default:
        return false;
    }
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
        me.hasDeliverData = true;
      } else if (item.state == 'DELIVERY') {
        me.atime[4] = item.acceptTime;
        me.hasDeliverData = true;
      } else if (item.state == 'PREPARE') {
        me.atime[3] = item.acceptTime;
      } else if (item.state == 'PAID'|| item.state == 'ASSIGNED') {
        me.atime[2] = item.acceptTime;
      } else if (item.state == 'CR') {
        me.atime[1] = item.acceptTime;
      }
    }
    if(me.hasDeliverData) me.expressData = me.ordersService.getExpressInfo(me.curOrdno);
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

}


