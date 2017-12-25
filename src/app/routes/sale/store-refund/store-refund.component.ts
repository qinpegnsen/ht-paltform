import {Component, OnInit} from "@angular/core";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {AfterService} from "../after.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-store-refund',
  templateUrl: './store-refund.component.html',
  styleUrls: ['./store-refund.component.scss']
})
export class StoreRefundComponent implements OnInit {
  public refundList: Page = new Page();
  public detail = [];
  public showList: boolean = true;
  public isReceiveList: object;  //是否收到货枚举列
  public afterStateList: object; //售后单状态枚举列
  public search: any = {
    curPage: null,
    pageSize: 10,
    returnType: 'REFUND',
    state: '',
    isReceive: '',
    afterNo: null,
    phone: null,
    ordno: null,
    searchType: 'afterNo',
  };

  constructor(public submit: SubmitService,
              public tools: RzhtoolsService,
              public after: AfterService) {
  }

  ngOnInit() {
    let me = this;
    me.afterStateList = me.tools.getEnumDataList(1602);
    me.isReceiveList = me.tools.getEnumDataList(1001);
    this.queryAllService();
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
    if(event.refresh) this.queryAllService(this.search.curPage)
  }

  /**
   * 切换搜索条件时
   */
  changeSearchType(val) {
    if (val == 'afterNo') {
      this.search.phone = null;
      this.search.ordno = null;
    } else if (val == 'phone') {
      this.search.afterNo = null;
      this.search.ordno = null;
    } else if (val == 'ordno') {
      this.search.afterNo = null;
      this.search.phone = null;
    }
  }

  /**
   * 查询退款列表信息
   */
  queryAllService(page?,event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    else if (!isNullOrUndefined(page)) activePage = page;
    let url = "/after/queryAfterGoodsReqPages";
    me.search.curPage = activePage;
    let result = this.submit.getData(url, me.search);
    if (isNullOrUndefined(result)) return;
    me.refundList = new Page(result);
    me.detail = [];
  }

  /**
   * 重置搜索条件
   *
   */
  resetSearch() {
    this.search = {};
    this.search.searchType='afterNo';
    this.search.returnType='REFUND';
    this.queryAllService();
  }

  /**
   * 点击待审核退款直接更改售后单的状态，查询待审核退款列表
   */
  changeSaleAfterState() {
    this.search.state = 'WAIT';
    this.queryAllService();
  }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(index) {
    if (this.detail[index]) this.detail[index] = false;
    else this.detail[index] = true;
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 15) + 'px';
    target.style.left = (event.clientX + 20) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }
}
