import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {ShopsComponent} from "../shops.component";
import {SubmitService} from "../../../../core/forms/submit.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "util";
import {Page} from "../../../../core/page/page";

@Component({
  selector: 'app-all-shop',
  templateUrl: './all-shop.component.html',
  styleUrls: ['./all-shop.component.scss']
})
export class AllShopComponent implements OnInit {
  public shopList: Page = new Page();
  public showList: boolean = true;//是否显示列表页
  public path: string = '';//当前路由
  public query: any = {};//查询条件
  public bsConfig: Partial<BsDatepickerConfig>;
  public storeState: string;//企业状态
  public dataPickerTime: any = null;//时间查询
  public time: any = {};//查询时间

  constructor(public router: Router,
              public route: ActivatedRoute,
              public tools: RzhtoolsService,
              public parentComp: ShopsComponent,
              public submitService: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY/MM/DD'
    });
  }

  ngOnInit() {
    let me = this;
    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      switch (me.path) {
        case 'allShop':
          me.parentComp.storeState = '';
          me.storeState = '';
          break;
        case "normal":
          me.parentComp.storeState = 'NORMAL';
          me.storeState = 'NORMAL';
          break;
        case "shopAudit":
          me.storeState = 'PENDING';
          break;
        case "pending":
          me.parentComp.storeState = 'PENDING';
          me.storeState = 'PENDING';
          break;
        case "reject":
          me.parentComp.storeState = 'REJECT';
          me.storeState = 'REJECT';
          break;
        case 'close':
          me.parentComp.storeState = 'CLOSE';
          me.storeState = 'CLOSE';
          break;
        default:
          me.parentComp.storeState = '';
          me.storeState = '';
          break;
      }
    })
    me.queryShops(1);//初始化查询数据
  }

  /**
   * 当时间选择器选择的时间变化时获取时间
   */
  getTimes(event) {
    if (event && event.length > 0) {
      this.time.createTimeBegin = RzhtoolsService.dataFormat(event[0], 'yyyy-MM-dd');
      this.time.createTimeEnd = RzhtoolsService.dataFormat(event[1], 'yyyy-MM-dd');
      this.queryShops(1);
    }
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  queryShops(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/stores/query';
    _this.shopList.params = {
      curPage: activePage,
      pageSize: 10,
      storeState: _this.storeState,
      storeName: _this.query.storeName,
      storeCode: _this.query.storeCode,
      sellerCode: _this.query.sellerCode,
      createTimeBegin: _this.time.createTimeBegin,
      createTimeEnd: _this.time.createTimeEnd
    }
    _this.shopList = new Page(_this.submitService.getData(requestUrl, _this.shopList.params));
  }

  /**
   * 重置查询条件
   */
  resetQuery() {
    this.query = {};
    this.dataPickerTime = null;
    this.time = {};
    this.queryShops(1);
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    if (event.refresh) this.queryShops(this.query.curPage)
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
}

