import {Component, OnInit} from '@angular/core';
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {NavigationEnd, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {isNullOrUndefined} from "util";
declare var $:any;
const swal = require('sweetalert');
@Component({
  selector: 'app-inspect-goods',
  templateUrl: './inspect-goods.component.html',
  styleUrls: ['./inspect-goods.component.scss']
})
export class InspectGoodsComponent implements OnInit {

  private returnList: Page = new Page();
  private seebutton: object;//查看按钮
  private detail = [];
  private isReceiveList: object; //售后单状态枚举列
  private selectText: string; //选择查询的状态
  private search: any = {
    curPage: null,
    pageSize: 10,
    returnType: 'RETURN',
    isReceive: '',
    afterNo: null,
    state: '',
    phone: null,
    ordno: null,
    goodsBaseCode: null,
    agentCode: null,
    stateDelivery: 'DELIVERY',
    stateAgree: 'AGREE',
  };

  constructor(private submit: SubmitService, private router: Router,
              private tools: RzhtoolsService,) {
  }

  ngOnInit() {
    let me = this;
    me.isReceiveList = me.tools.getEnumDataList(1001);

    this.queryAllService();
  }

  /**
   * 切换搜索条件时
   */
  changeSearchType(val) {
    if (val == 'afterNo') {
      this.search.phone = null;
      this.search.ordno = null;
      this.search.baseCode = null;
    } else if (val == 'phone') {
      this.search.afterNo = null;
      this.search.ordno = null;
      this.search.baseCode = null;
    } else if (val == 'ordno') {
      this.search.afterNo = null;
      this.search.phone = null;
      this.search.baseCode = null;
    } else if (val == 'baseCode') {
      this.search.ordno = null;
      this.search.afterNo = null;
      this.search.phone = null;
    }
  }

  /**
   * 查询买家评价分页
   */
  queryAllService(event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/after/queryAfterGoodsReqCheckPages";
    me.search.curPage = activePage;
    let result = this.submit.getData(url, me.search);
    if (isNullOrUndefined(result)) return;
    me.returnList = new Page(result);
    me.detail = [];
  }

  /**
   * 改变收货的状态
   */
  selectState(obj){
    if( $(obj)[0].className.indexOf('bb')>1){
      return;
    }else{
      $(obj).parents('.order-guide').find('.bb').removeClass("bb");
      $(obj).addClass("bb");//边框
    };
    let selectCon=$.trim($(".order-guide .bb").text());//获取文本之后再把多余的空格去掉，要不然html大代码一整理就出错了
    if(selectCon=='待验货'){
      this.selectText='DELIVERY'
    }else{
      this.selectText='AGREE'
    };
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
