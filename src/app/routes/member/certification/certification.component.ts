import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined, isUndefined} from "util";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  private data: Page = new Page();
  private state:any;//审核状态
  private showReasonWindow:boolean = false;
  private orderId1:any;
  private curPage1:any;

  constructor(private submit: SubmitService,private rzhtoolsService:RzhtoolsService) { }

  ngOnInit() {
    let me = this;
    this.aqeuryAll('AUDIT',1);
  }

  /**
   * 认证审核--查询分页
   */
  aqeuryAll(state,curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if(isNullOrUndefined(state)) state = 'AUDIT';
      me.state = state;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let url = "/custAuthInfo/query";
    let data={
      curPage: activePage,
      pageSize:10,
      state: me.state,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
  }

  /**
   * 认证通过
   */
  access(id,curPage){
    let url = '/custAuthInfo/updateState';
    let data = {
      id:id,
      state: 'PASS',
    }
    this.submit.putRequest(url, data);
    this.aqeuryAll(this.state,curPage);
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event,i){
    i.style.display = 'block';
    i.style.top = (event.clientY-150) + 'px';
    i.style.left = (event.clientX-500) + 'px';

  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }

  /*
   * 添加弹窗
   * */
  addNewData(orderId,curPage) {
    this.orderId1=orderId;
    this.showReasonWindow = true;
    this.curPage1=curPage;
  }

  getReason(data) {
    this.showReasonWindow = false;
    if(data == 'success') this.aqeuryAll('AUDIT',1);
  }
}
