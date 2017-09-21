import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {PageEvent} from "angular2-datatable";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-wo-all',
  templateUrl: './wo-all.component.html',
  styleUrls: ['./wo-all.component.scss']
})
export class WoAllComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  private woList: Page = new Page();
  private detail = []

  constructor(private parentComp: WoManageComponent,
              private submit: SubmitService,
  ) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue'
    });
    this.parentComp.woType = 1
  }

  ngOnInit() {
    let me = this;
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
    _this.woList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  showDetail(index){
    this.detail[index] = !this.detail[index];
  }

}
