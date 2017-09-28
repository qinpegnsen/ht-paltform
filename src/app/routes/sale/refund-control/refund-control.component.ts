import {Component, OnInit} from "@angular/core";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {Router} from "@angular/router";
const swal = require('sweetalert');
@Component({
  selector: 'app-refund-control',
  templateUrl: './refund-control.component.html',
  styleUrls: ['./refund-control.component.scss']
})
export class RefundControlComponent implements OnInit {

  private refundList: Page = new Page();
  private seebutton: object;//查看按钮
  private handlebutton: object;//处理按钮
  private detail = [];
  private redbutton: object;//处理过的按钮

  constructor(private submit: SubmitService, private router: Router) {
  }

  ngOnInit() {
    let me = this;
    me.seebutton = {
      title: "查看",
      type: "details",
      text: '查看'
    };
    me.handlebutton = {
      title: "处理",
      type: "set",
      text: '处理'
    };

    this.queryAllService();
  }

  /**
   * 查询买家评价分页
   */
  queryAllService(event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/after/queryAfterGoodsReqPages";
    let data = {
      curPage: activePage,
      pageSize: 10,
      returnType: 'REFUND'
    }
    let result = this.submit.getData(url, data);
    me.refundList = new Page(result);
    me.detail = [];
    console.log("█ result ►►►", result);
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
  showImg(event, i) {
    i.style.display = 'block';
    i.style.top = (event.clientY + 15) + 'px';
    i.style.left = (event.clientX + 20) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }
}
