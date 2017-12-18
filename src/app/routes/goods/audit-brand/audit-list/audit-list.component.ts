import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuditBrandComponent} from "../audit-brand.component";
import {PageEvent} from "angular2-datatable";
import {isUndefined} from "util";
import {Page} from "../../../../core/page/page";
import {GoodsService} from "../../goods.service";
import {SubmitService} from "../../../../core/forms/submit.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.scss']
})
export class AuditListComponent implements OnInit {
  public path: string;//当前路由
  public showList: boolean = true;
  public search: any = {}; //查询条件
  public content: string;
  public brands: Page = new Page();
  public addButton;
  public buttons;
  public kindList;// 分类列表
  public selectKindName: string = '根据分类查询';
  public curBrandId: string;//当前点击的品牌id
  public curBrandName: string;//当前点击的品牌名称
  public englishName: string;//当前点击的品牌英文名称
  public brandHolder: string;//当前点击的品牌所有者
  public applyNumber: string;//当前点击的品牌申请号

  public query = {
    curPage: 1,
    pageSize: 10,
    sortColumns: '',
    kindId: null,
    brandName: null,
    brandInitial: null,
    brandRecommend: null
  };

  constructor(public router: Router,
              public route: ActivatedRoute,
              public parentComp: AuditBrandComponent,
              public submitService: SubmitService,
              public goods: GoodsService) {
  }

  ngOnInit() {
    let me = this;
    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      switch (me.path) {
        case "unAudit":
          me.parentComp.auditType = 'APPLY';
          me.search.ordState = 'APPLY';
          me.content = '“待审核”品牌列表';
          break;
        case "audited":
          me.parentComp.auditType = 'PASS';
          me.search.ordState = 'PASS';
          me.content = '“已审核”品牌列表';
          break;
        case "reject":
          me.parentComp.auditType = 'UNPASS';
          me.search.ordState = 'UNPASS';
          me.content = '“已驳回”品牌列表';
          break;
        default:
          me.parentComp.auditType = 'APPLY';
          me.search.ordState = 'APPLY';
          me.content = '待审核品牌列表';
          break;
      }
    });
    me.queryDatas(1);// 获取品牌数据
    me.kindList = me.goods.getKindList(); //获取分类列表
    me.addButton = {
      type: 'add-thc',
      text: '新增品牌',
    };
  }

  /**
   *删除未审核品牌
   */
  deleteBrand(curPage, brandId) {
    let me = this;
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
      let url = '/goodsBrandApply/deleteBrandApply';
      let data = {applyCode: brandId};
      swal.close();
      me.submitService.delRequest(url, data);
      me.queryDatas(curPage);
    });
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
   queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    _this.query.curPage = activePage;
    let requestUrl = '/goodsBrandApply/queryPage';
    _this.brands = new Page(_this.submitService.getData(requestUrl, _this.query));
  }

  /**
   * 当前品牌id
   * @param curId
   */
  setBrandId(curId,brandName,englishName,brandHolder,applyNumber){
    this.curBrandId = curId;
    this.curBrandName = brandName;
    this.englishName = englishName;
    this.brandHolder = brandHolder;
    this.applyNumber = applyNumber;
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    if (!event.isAudit) this.showList = false;
    event.brandId = this.curBrandId;
    event.brandName = this.curBrandName;
    event.englishName = this.englishName;
    event.brandHolder = this.brandHolder;
    event.applyNumber = this.applyNumber;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    if (event.refresh) this.queryDatas(this.query.curPage)
  }
}
