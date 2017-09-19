import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  private data: Page = new Page();
  constructor(private submit: SubmitService) { }

  ngOnInit() {
    let me = this;
    this.qeuryAllService()
  }

  /**
   * 认证审核--查询分页
   */
  qeuryAllService(event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/custAuthInfo/query";
    let data={
      curPage: activePage,
      pageSize:10,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
    console.log(me.data);
  }

  /**
   * 认证通过
   */
  access(id){
    let url = '/custAuthInfo/updateState';
    let data = {
      id:id,
      state: 'PASS',
    }
    this.submit.putRequest(url, data, true);
    this.qeuryAllService();
  }
  /**
   * 认证未通过
   */
  cancel(id){
    let url = '/custAuthInfo/updateState';
    let data = {
      id: id,
      state: 'UNPASS',
    }
    this.submit.putRequest(url, data, true);
    this.qeuryAllService();
  }
}
