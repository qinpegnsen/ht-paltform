import {Component, OnInit} from '@angular/core';
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {Router} from "@angular/router";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
const swal = require('sweetalert');

@Component({
  selector: 'app-cash-check',
  templateUrl: './cash-check.component.html',
  styleUrls: ['./cash-check.component.scss']
})
export class CashCheckComponent implements OnInit {
  public showRefundWindow: boolean = false;
  public showCashWindow: boolean = false;
  public deposits: Page = new Page();
  public currentId1;
  public currentId2;
  public detail = [];
  public drawMoney;//提现金额
  public name;//提现金额
  public acct;//提现金额
  public bank;//提现金额
  public query = {
    state: ''
  };
  public states: any;

  constructor(public router: Router,
              public tools: RzhtoolsService,
              public submitService: SubmitService) {
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1);// 获取品牌数据
    me.states = me.tools.getEnumDataList('1802')
  }

  /**
   * 同意提现
   * @param curId
   */
  // aggreeDraw(id,page) {
  //   let url = '/finaceStoreDraw/updateState';
  //   let data = {
  //     id: id,
  //     drawState: 'DEAL'
  //   }
  //   this.submitService.postRequest(url, data)
  //   this.queryDatas(page)
  // }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(index) {
    if (this.detail[index]) this.detail[index] = false;
    else this.detail[index] = true;
  }

  /**
   * 添加提现记录
   * @param curId
   */
  addRecord(curId, drawMoney) {
    this.currentId1 = curId;
    this.drawMoney = drawMoney;
  }

  /**
   * 添加提现记录
   * @param curId
   */
    aggreeDraw(curId, name,acct,drawMoney,bank) {
    this.currentId2 = curId;
    this.name = name;
    this.acct = acct;
    this.drawMoney = drawMoney;
    this.bank = bank;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getAddRecordData(data) {
    this.currentId1 = null;
    this.drawMoney = null;
    if (data.type) this.queryDatas(data.page)
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }


  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/finaceStoreDraw/query';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      drawState: _this.query.state
    };
    _this.deposits = new Page(_this.submitService.getData(requestUrl, requestData));
    _this.detail = []
  }

  /**
   * 发货回调函数
   * @param data
   */
  getAdd(data) {
    this.currentId2 = null;
    this.drawMoney = null;
    if (data.type) this.queryDatas(data.page)
  }
}
