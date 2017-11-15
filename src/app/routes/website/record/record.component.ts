import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {isNullOrUndefined} from "util";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  public data:any;                      //红包规则列表的数据

  constructor(private submit: SubmitService) { }

  ngOnInit() {
    this.qeuryAll(1)
  }

  /**
   * 红包规则列表
   */
  qeuryAll(curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = "/rpSetting/queryRpSettingAdmin";
    let data={
      curPage: activePage,
      pageSize:10,
      isUsed:'',
    };
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
  }


}
