import { Component, OnInit } from '@angular/core';
import {OrdersComponent} from "../orders.component";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {isUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-wait-for-send',
  templateUrl: './wait-for-send.component.html',
  styleUrls: ['./wait-for-send.component.scss']
})
export class WaitForSendComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  public goodsList: Page = new Page();
  constructor(private parentComp:OrdersComponent,
              private submit: SubmitService,) {

    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 3;
    me.queryDatas(1)
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
    let requestUrl = '/goodsQuery/query';
    let requestData = {
      curPage: activePage,
      pageSize: 2,
      sortColumns: '',
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
  }

}
