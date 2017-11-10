import { Component, OnInit } from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../core/forms/submit.service';
import {PatternService} from '../../../core/forms/pattern.service';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';
import {OrderService} from '../order.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-agent-ept',
  templateUrl: './agent-ept.component.html',
  styleUrls: ['./agent-ept.component.scss']
})
export class AgentEptComponent implements OnInit {
  public goodsList;
  public flag: boolean=false;
  public orderNumber;
  public curCancelOrderId:string;
  public isDisplay:boolean=true;//关闭申请的按钮
  public LogisticsData;//物流信息

  constructor(public submit: SubmitService,public patterns: PatternService,public OrderService:OrderService) { }

  ngOnInit() {
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas( event?: PageEvent) {
    this.flag=true;
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = '/agentOrd/loadAgentOrdUnusual';
    let requestData = {
      ordno:this.orderNumber
    };
    _this.goodsList = _this.submit.getData(requestUrl, requestData);
    swal(this.goodsList.info,'','error');
  }

  /**
   * 显示买家信息
   * @param event
   * @param i
   */
  showUserInfo(i) {
    i.style.display = 'block';
  }
  /**
   * 隐藏买家信息
   * @param i
   */
  hideBuyerInfo(i){
    i.style.display = 'none';
  }
  cancelOrder(orderId){
    this.curCancelOrderId = orderId;
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics,ordno) {
    Logistics.style.display = 'block';
    if(isUndefined(ordno)) ordno = ordno;
    this.LogisticsData = this.OrderService.getOrderLogisticsData(ordno);
  }
  /**
   *隐藏物流信息
   * @param orderId
   */
  hideLogistics(Logistics) {
    Logistics.style.display = 'none';
  }
  /**
   * 取消订单回调函数
   * @param data
   */
  getCancelOrderData(obj){
    this.curCancelOrderId = null;
    if(obj.bol){
      this.isDisplay=false;//申请成功后关闭申请按钮隐藏
    }
  }
}
