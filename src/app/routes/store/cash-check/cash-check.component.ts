import {Component, OnInit} from '@angular/core';
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {Router} from "@angular/router";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {listLocales} from "ngx-bootstrap/bs-moment";
const swal = require('sweetalert');

@Component({
  selector: 'app-cash-check',
  templateUrl: './cash-check.component.html',
  styleUrls: ['./cash-check.component.scss']
})
export class CashCheckComponent implements OnInit {
  public showRefundWindow: boolean = false;
  public curState: string = '';      //当前的状态
  public bacctName:any;   //收款人姓名
  public myTime;             //传查询的时间范围
  public deposits: Page = new Page();
  public currentId1;
  public currentId2;
  public drawMoney;//提现金额
  public name;//收款人姓名
  public acct;//收款人账户
  public bank;//收款人开户行
  public query: any = {};//查询条件
  public states: any;
  locale = 'en';
  locales = listLocales();
  bsConfig: Partial<BsDatepickerConfig>;
  applyLocale(pop: any) {
    this.bsConfig = Object.assign({}, { locale: 'cn' });
    setTimeout(() => {
      pop.hide();
      pop.show();
    });
  }
  constructor(public router: Router,
              public tools: RzhtoolsService,
              public submitService: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let me = this;
    me.queryDatas('CR',1);// 获取品牌数据
    me.states = me.tools.getEnumDataList('1802')
  }



  /**
   * 重置查询条件
   */
  resetQuery(){
    this.query = {};
    this.myTime = null;
    this.queryDatas(this.curState,1);
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(state,curPage, event?: PageEvent) {
    if (state) {
      this.curState = state;
    } else {
      if (!this.curState) {
        this.curState = 'CR';
      }
    }
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
      drawState:this.curState,
      bacctName:_this.query.bacctName,
      dateStr:this.myTime?RzhtoolsService.dataFormat(this.myTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.myTime[1], 'yyyy/MM/dd'):'',
    };
    _this.deposits = new Page(_this.submitService.getData(requestUrl, requestData));
  }


  /**
   * 发货回调函数
   * @param data
   */
  getAdd(data) {
    this.currentId2 = null;
    this.drawMoney = null;
    if (data.type) this.queryDatas(this.curState,data.page)
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
    if (data.type) this.queryDatas(this.curState,data.page)
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
}
