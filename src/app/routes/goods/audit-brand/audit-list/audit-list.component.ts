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
  public brandName:any;

  public query = {
    curPage: 1,
    pageSize: 10,
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
          me.parentComp.auditType = 'CR';
          me.search.ordState = 'CR';
          me.content = '“待审核”品牌列表';
          break;
        case "audited":
          me.parentComp.auditType = 'PASS';
          me.search.ordState = 'PASS';
          me.content = '“已审核”品牌列表';
          break;
        case "reject":
          me.parentComp.auditType = 'REJECT';
          me.search.ordState = 'REJECT';
          me.content = '“已驳回”品牌列表';
          break;
        default:
          me.parentComp.auditType = 'CR';
          me.search.ordState = 'CR';
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
    let params = {
      curPage: activePage,
      pageSize: 10,
      brandName:_this.brandName,
      state:_this.search.ordState,
    }
    _this.brands = new Page(_this.submitService.getData(requestUrl,params));
  }


  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    if (!event.isAudit) this.showList = false;
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
