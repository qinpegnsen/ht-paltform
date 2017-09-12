import { Component, OnInit } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";

@Component({
  selector: 'app-integration-details',
  templateUrl: './integration-details.component.html',
  styleUrls: ['./integration-details.component.scss']
})
export class IntegrationDetailsComponent implements OnInit {
  private data: Page = new Page();
  constructor(private ajax: AjaxService, private submit: SubmitService) {
  }

  ngOnInit() {
    this.qeuryAllService();
  }


  //积分明细--查询分页
  qeuryAllService(event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/custCoin/query";
    let data={
      curPage: activePage,
      pageSize:10,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
  }
}
