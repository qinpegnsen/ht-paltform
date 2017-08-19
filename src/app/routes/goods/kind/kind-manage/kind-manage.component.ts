import {Component, OnInit} from '@angular/core';
import {KindService} from "../kind.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../../core/page/page";
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";

@Component({
  selector: 'app-kind-manage',
  templateUrl: './kind-manage.component.html',
  styleUrls: ['./kind-manage.component.scss'],
  providers: [KindService]
})
export class KindManageComponent implements OnInit {
  private searchKey: string;
  private kinds: Page = new Page();
  private addButton;
  private buttons;

  constructor(private kindService: KindService,private router:Router, private submitService:SubmitService) {
  }

  ngOnInit() {
    let me = this;
    this.queryDatas();
    this.addButton = {
      type: 'add',
      text: '新增分类',
    };
    this.buttons = [
      {
        title: "修改",
        type: "update",
        size: "xs",
        callback: function (result, kindId) {
          result.then((id) => {
            // me.router.navigate(['/main/system/admins/updateAdmin']);
          })
        }
      },
      {
        title: "删除",
        type: "delete",
        size: "xs",
        callback: function (result, kindId) {
          result.then((id) => {
            // me.router.navigate(['/main/system/admins/adminDetail', kindId]);
          })
        }
      }
    ];
  }

  /**
   * 修改
   * @param show
   * @param kindId
   */
  changeKindState(show, kindId, curPage) {
    let state, requestData, requestUrl;
    if (show) {
      state = 'HIDE'
    } else {
      state = 'SHOW'
    };
    requestUrl = '/goodskind/updateStateById';
    requestData = {
      id: kindId,
      state: state
    }
    this.submitService.changeStateDel(requestUrl,requestData);
    this.queryDatas(curPage);
  }
  queryDatas(event?: PageEvent, curPage?) {
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let requestUrl = '/goodskind/queryGoodsKindPageByParentId';
    let requestData = {
      curPage: activePage,
      pageSize: 10
    };
    let result = me.kindService.getListpage(requestUrl, requestData)
    me.kinds = new Page(result);
  }



}
