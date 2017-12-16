import {Component, OnInit} from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {Router} from "@angular/router";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-cash-record',
  templateUrl: './cash-record.component.html',
  styleUrls: ['./cash-record.component.scss']
})
export class CashRecordComponent implements OnInit {
  public deposits: Page = new Page();
  public query = {
    state: ''
  };
  public detail = [];

  constructor(public router: Router,
              public tools: RzhtoolsService,
              public submitService: SubmitService) {
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1);// 获取品牌数据
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
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(index) {
    if (this.detail[index]) this.detail[index] = false;
    else this.detail[index] = true;
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
      drawState: 'DONE'
    };
    _this.deposits = new Page(_this.submitService.getData(requestUrl, requestData));
    this.detail = []
  }
}
