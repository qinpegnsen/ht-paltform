import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {KindService} from "../kind/kind.service";
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  providers: [KindService]
})
export class BrandsComponent implements OnInit {
  private brands: Page = new Page();
  private addButton;
  private buttons;

  constructor(private router: Router, private kindService: KindService, private submitService: SubmitService) {
  }


  ngOnInit() {
    let me = this;
    this.queryDatas();
    this.addButton = {
      type: 'add',
      text: '新增品牌',
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
  changeBrandState(show, brandId, curPage) {
    let state, requestData, requestUrl;
    if (show) {
      state = 'HIDE'
    } else {
      state = 'SHOW'
    }
    ;
    requestUrl = '/goodsBrand/updateState';
    requestData = {
      id: brandId,
      state: state
    }
    this.submitService.changeStatePut(requestUrl, requestData);
    this.queryDatas(curPage);
  }


  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  queryDatas(event?: PageEvent, curPage?) {
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    ;
    let requestUrl = '/goodsBrand/getBrandPages';
    let requestData = {
      curPage: activePage,
      pageSize: 10
    };
    let result = me.kindService.getListpage(requestUrl, requestData)
    me.brands = new Page(result);
  }


}

