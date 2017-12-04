import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  public drawRecData:any;                      //红包中奖记录数据

  constructor(private submit: SubmitService) { }

  ngOnInit() {
    this.qeuryAll(1)
  }

  /**
   * 红包中奖记录
   */
  qeuryAll(curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = "/rpCustAcctRec/queryRpCustAcctRecAdmin";
    let data={
      curPage: activePage,
      pageSize:10,
      logType:'DRAW'
    };
    let result = this.submit.getData(url,data);
    me.drawRecData = new Page(result);
  }
}
