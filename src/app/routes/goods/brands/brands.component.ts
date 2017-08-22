import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  public brands: Page = new Page();
  private addButton;
  private buttons;
  private brandName;// 品牌名称
  private brandInitial;// 首字母
  private brandRecommend;// 是否推荐
  constructor(private router: Router, private submitService: SubmitService) {
  }

  ngOnInit() {
    let me = this;
    this.queryDatas(1);
    this.addButton = {
      type: 'add',
      text: '新增品牌',
    };
    this.buttons = [
      {
        title: "修改",
        type: "update",
        size: "xs",
        callback: function (result, brandId, curPage) {
          result.then((id) => {
            me.router.navigate(['/pgoods/brands/upBrand', brandId], {queryParams: {page: curPage}});
          })
        }
      },
      {
        title: "删除",
        type: "delete",
        size: "xs",
        callback: function (result, brandId, curPage) {
          result.then((id) => {
            let url = '/goodsBrand/deleteBrand';
            let data = {id: brandId};
            me.submitService.delRequest(url, data);
            me.queryDatas(curPage);
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
    console.log("█ brandId ►►►", brandId);
    let state, requestData, requestUrl;
    state = show ? 'HIDE' : 'SHOW';
    requestUrl = '/goodsBrand/updateState';
    requestData = {
      id: brandId,
      state: state
    };
    console.log("█ requestData ►►►", requestData);
    this.submitService.putRequest(requestUrl, requestData);
    this.queryDatas(curPage);
  }

  changeBrandRecommend(show, brandId, curPage) {
    console.log("█ brandId ►►►", brandId);
    let brandRecommend, requestData, requestUrl;
    brandRecommend = show ? 'N' : 'Y';
    requestUrl = '/goodsBrand/updateRecommend';
    requestData = {
      id: brandId,
      brandRecommend: brandRecommend
    };
    console.log("█ requestData ►►►", requestData);
    this.submitService.putRequest(requestUrl, requestData);
    this.queryDatas(curPage);
  }


  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    ;
    let requestUrl = '/goodsBrand/getBrandPages';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      brandName: _this.brandName,
      brandInitial: _this.brandInitial,
      brandRecommend: _this.brandRecommend
    };
    console.log("█ requestData ►►►", requestData);
    _this.brands = new Page(_this.submitService.getData(requestUrl, requestData));
  }


}

