import {Component, OnInit} from '@angular/core';
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {NavigationEnd, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {AfterService} from "../after.service";
const swal = require('sweetalert');
@Component({
  selector: 'app-return-control',
  templateUrl: './return-control.component.html',
  styleUrls: ['./return-control.component.scss']
})
export class ReturnControlComponent implements OnInit {

  private returnList: Page = new Page();
  private goodsName: any;
  private seebutton: object;//查看按钮
  private handlebutton: object;//处理按钮
  private LogisticsData: object;//物流信息
  private detail = [];
  // private returnList:any;

  constructor(private submit: SubmitService, private router: Router,
              private after: AfterService) {
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
      goodsName: me.goodsName,
      returnType: 'RETURN'
    }
    let result = this.submit.getData(url, data);
    me.returnList = new Page(result);
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
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics, afterNo) {
    Logistics.style.display = 'block';
    /*if(isUndefined(ordno))*/
    afterNo = '1234123451235';
    this.LogisticsData = this.after.getOrderLogisticsData(afterNo);
  }

  /**
   *隐藏物流信息
   * @param orderId
   */
  hideLogistics(Logistics) {
    Logistics.style.display = 'none';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }
}
