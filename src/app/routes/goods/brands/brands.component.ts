import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SubmitService} from "../../../core/forms/submit.service";
const swal = require('sweetalert');
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  public brands: Page = new Page();
  private addButton;
  private buttons;
  private brandName: string = '';// 品牌名称
  private brandInitial: string = '';// 首字母
  private brandRecommend: string = '';// 是否推荐
  private kindList;// 分类列表
  private selectKindName: string = '根据分类查询';
  private brandKind;// 品牌分类
  constructor(private router: Router, private submitService: SubmitService) {
  }

  ngOnInit() {
    let me = this;
    this.queryDatas(1);// 获取品牌数据
    this.getKindList();// 获取分类列表
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
            me.router.navigate(['/main/goods/brands/upBrand', brandId], {queryParams: {page: curPage}});
          })
        }
      },
      {
        title: "删除",
        type: "delete",
        size: "xs",
        callback: function (result, brandId, curPage) {
          result.then((id) => {
            swal({
              title: '确定要删除吗？',
              text: '删除后将不能找回',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              closeOnConfirm: false,
              closeOnCancel: true
            }, () => {
              let url = '/goodsBrand/deleteBrand';
              let data = {id: brandId};
              me.submitService.delRequest(url, data);
              me.queryDatas(curPage);
              // swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
            });
          })
        }
      },
      {
        title: "详情",
        type: "details",
        size: "xs",
        callback: function (result, brandId, curPage) {
          result.then((id) => {
            me.router.navigate(['/main/goods/brands/brandDetail', brandId], {queryParams: {page: curPage}});
          })
        }
      }
    ];
  }

  /**
   * 获取分类列表
   */
  getKindList(){
    let url = '/goodsKind/queryGoodsByParentId';
    let data = {kindParentId:''}
    this.kindList = this.submitService.getData(url,data)
  }

  selected(id,name){
    this.brandKind = id;
    this.selectKindName = name;
    this.queryDatas(1)
  }


  /**
   * 修改状态
   * @param show
   * @param kindId
   */
  changeBrandState(show, brandId, curPage) {
    let state, requestData, requestUrl;
    state = show ? 'HIDE' : 'SHOW';
    requestUrl = '/goodsBrand/updateState';
    requestData = {
      id: brandId,
      state: state
    };
    this.submitService.putRequest(requestUrl, requestData);
    this.queryDatas(curPage);
  }

  /**
   * 修改是否推荐
   * @param show
   * @param brandId
   * @param curPage
   */
  changeBrandRecommend(show, brandId, curPage) {
    let brandRecommend, requestData, requestUrl;
    brandRecommend = show ? 'N' : 'Y';
    requestUrl = '/goodsBrand/updateRecommend';
    requestData = {
      id: brandId,
      brandRecommend: brandRecommend
    };
    this.submitService.putRequest(requestUrl, requestData);
    this.queryDatas(curPage);
  }


  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    ;
    let requestUrl = '/goodsBrand/queryBrandPagesByNA';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      kindId: _this.brandKind,
      brandName: _this.brandName,
      brandInitial: _this.brandInitial,
      brandRecommend: _this.brandRecommend
    };
    _this.brands = new Page(_this.submitService.getData(requestUrl, requestData));
    // console.log("█ _this.brands ►►►", _this.brands);
  }


}

