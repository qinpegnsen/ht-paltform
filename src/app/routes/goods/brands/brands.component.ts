import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
const swal = require('sweetalert');
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  public brands: Page = new Page();
  public addButton;
  public buttons;
  public kindList;// 分类列表
  public selectKindName: string = '根据分类查询';
  public brandKind;// 品牌分类
  public query = {
    curPage: 1,
    pageSize: 10,
    sortColumns: '',
    kindId: null,
    brandName: null,
    brandInitial: null,
    brandRecommend: null
  };

  constructor(public router: Router, public submitService: SubmitService, public goods: GoodsService) {
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1);// 获取品牌数据
    me.kindList = me.goods.getKindList(); //获取分类列表
    me.addButton = {
      type: 'add-thc',
      text: '新增品牌',
    };
    me.buttons = [
      {
        title: "修改",
        type: "update",
        size: "xs",
        callback: function (result, brandId, curPage) {
          result.then((id) => {
            me.router.navigate(['/main/goods/brands/upBrand'], {queryParams: {page: curPage, brandId: brandId}});
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
              swal.close();
              me.submitService.delRequest(url, data);
              me.queryDatas(curPage);
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
            me.router.navigate(['/main/goods/brands/brandDetail'], {queryParams: {page: curPage, brandId: brandId}});
          })
        }
      }
    ];
  }

  /**
   * 选择分类
   * @param id
   * @param name
   */
  selected(id, name) {
    this.query.kindId = id;
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
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
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
    _this.query.curPage = activePage;
    let requestUrl = '/goodsBrand/queryBrandPagesByNA';
    _this.brands = new Page(_this.submitService.getData(requestUrl, _this.query));
  }


}

