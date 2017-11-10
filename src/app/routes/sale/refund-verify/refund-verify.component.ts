import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../core/forms/submit.service";
import {Router} from "@angular/router";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');
@Component({
  selector: 'app-refund-verify',
  templateUrl: './refund-verify.component.html',
  styleUrls: ['./refund-verify.component.scss']
})
export class RefundVerifyComponent implements OnInit {
  public refundList: Page = new Page();
  public detail = [];
  public showList: boolean = true; //是否显示列表组件
  public isReceiveList: object; //售后单状态枚举列
  public search: any = {
    curPage: null,
    pageSize: 10,
    returnType: 'REFUND',
    state: 'WAIT',
    isReceive: '',
    afterNo: null,
    phone: null,
    ordno: null,
    searchType: 'afterNo',
  };

  constructor(public submit: SubmitService, public router: Router,
              public tools: RzhtoolsService,) {
  }

  ngOnInit() {
    let me = this;
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
   * 查询买家评价分页
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
