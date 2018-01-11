import {Component, OnInit} from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined, isUndefined} from "util";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  public data: Page = new Page();
  public state: any;//审核状态
  public showReasonWindow: boolean = false;
  public orderId1: any;//用户id
  public curPage1: any;//页数
  public name: any;//用户名
  public count1: any;//用户名
  constructor(public submit: SubmitService) {
  }

  ngOnInit() {
    this.aqeuryAll('AUDIT', 1);
  }

  /**
   * 认证审核--查询分页
   */
  aqeuryAll(state, curPage, event?: PageEvent) {
    let me = this, activePage = 1;
    if (isNullOrUndefined(state)) state = 'AUDIT';
    me.state = state;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let url = "/custAuthInfo/query";
    let data = {
      curPage: activePage,
      pageSize: 10,
      name: me.name,
      state: me.state,
    }
    let result = me.submit.getData(url, data);
    me.data = new Page(result);
  }


  /*
   * 添加弹窗
   * */
  addNewData(orderId, curPage, count) {
    let me = this;
    me.showReasonWindow = true;
    me.orderId1 = orderId;
    me.curPage1 = curPage;
    me.count1 = count;
  }

  getReason(data) {
    this.showReasonWindow = false;
    if (data == 'success') this.aqeuryAll('AUDIT', 1);
  }
}
