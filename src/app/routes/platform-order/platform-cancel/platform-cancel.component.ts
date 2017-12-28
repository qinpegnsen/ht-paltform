import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Page} from '../../../core/page/page';
import {SubmitService} from '../../../core/forms/submit.service';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';
import {RzhtoolsService} from '../../../core/services/rzhtools.service';

@Component({
  selector: 'app-platform-cancel',
  templateUrl: './platform-cancel.component.html',
  styleUrls: ['./platform-cancel.component.scss']
})
export class PlatformCancelComponent implements OnInit {

  public orderType: number = 1;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  public agentAcct;
  public agentName;
  public agentOrdno;
  public agentTime;
  public curCancelOrderId: string;
  public curDeliverOrderId: string;
  public lookLogisticsOrderId: string;
  public goodsList: Page = new Page();
  public showList: boolean = true;

  constructor(public submit: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.queryDatas(1)
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    console.log('█ this.agentTime ►►►', this.agentTime);

    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/agentOrd/queryAgentOrdAdmin';
    //格式化时间格式
    let dateStr = '';
    if (this.agentTime) {
      dateStr = RzhtoolsService.dataFormat(this.agentTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.agentTime[1], 'yyyy/MM/dd');
    }

    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      agentAcct: _this.agentAcct,
      goodsName: _this.agentName,
      ordno: _this.agentOrdno,
      dateStr: dateStr,
      state:'SUCCESS'
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
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
  hideBuyerInfo(i) {
    i.style.display = 'none';
  }

  cancelOrder(orderId) {
    this.curCancelOrderId = orderId;
  }

  deliverOrder(orderId) {
    this.curDeliverOrderId = orderId;
  }

  lookLogistics(orderId) {
    this.lookLogisticsOrderId = orderId;
  }

  /**
   * 取消订单回调函数
   * @param data
   */
  getCancelOrderData(data) {
    this.curCancelOrderId = null;
  }

}

