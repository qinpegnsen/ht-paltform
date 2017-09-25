import { Component, OnInit } from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {Page} from '../../../core/page/page';
import {SubmitService} from '../../../core/forms/submit.service';

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


  constructor(private submit: SubmitService,) { }

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
    let requestUrl = '/agentOrd/loadByOrdno';
    let requestData = {
      ordno:this.orderNumber
    };
    _this.goodsList = _this.submit.getData(requestUrl, requestData);
    console.log("█ _this.goodsList ►►►",  _this.goodsList);
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
   * 取消订单回调函数
   * @param data
   */
  getCancelOrderData(data){
    this.curCancelOrderId = null;
  }
}
