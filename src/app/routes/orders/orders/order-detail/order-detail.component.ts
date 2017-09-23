import {Component, OnInit} from "@angular/core";
import {OrdersComponent} from "../orders.component";
import {SubmitService} from "../../../../core/forms/submit.service";
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

  public orderStep = 1;
  public orderStates:any;
  public logisticsInfo:any;

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 'detail';
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
    me.getOrderStep();
  }

  /**
   * 获取订单当前进度
   */
  private getOrderStep(){
    let me = this, temp = [];
    for(let state of me.orderStates){
      if(state.state == 'SUCCESS'){
        temp.push(5);
      }else if(state.state == 'DELIVERY'){
        temp.push(4);
      }else if(state.state == 'PREPARE'){
        temp.push(3);
      }else if(state.state == 'PAID'){
        temp.push(2);
      }else if(state.state == 'CR'){
        temp.push(1);
      }
    }
    temp.sort();//排列
    me.orderStep = temp[temp.length-1];//当前进度为数组中最大的一个
  }

}


