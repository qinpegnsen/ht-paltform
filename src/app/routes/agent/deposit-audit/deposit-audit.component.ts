import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-deposit-audit',
  templateUrl: './deposit-audit.component.html',
  styleUrls: ['./deposit-audit.component.scss']
})
export class DepositAuditComponent implements OnInit {
  public deposits: Page = new Page();
  public currentId;
  public detail = [];
  public drawMoney;//提现金额
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
  aggreeDraw(id,page) {
    let url = '/finaceDraw/updateState';
    let data = {
      id: id,
      drawState: 'DEAL'
    }
    this.submitService.postRequest(url, data)
    this.queryDatas(page)
  }

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
  addRecord(curId,drawMoney) {
    this.currentId = curId;
    this.drawMoney = drawMoney;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getAddRecordData(data) {
    this.currentId = null;
    this.drawMoney = null;
    console.log("█ data ►►►",  data);
    if(data.type) this.queryDatas(data.page)
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
    let requestUrl = '/finaceDraw/query';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      drawState: _this.query.state
    };
    _this.deposits = new Page(_this.submitService.getData(requestUrl, requestData));
    _this.detail = []
  }


}
