import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SubmitService} from "../../../core/forms/submit.service";
import {EditBrandComponent} from "../edit-brand/edit-brand.component";
import {AppComponent} from "../../../app.component";

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
  componentRef: ComponentRef<EditBrandComponent>;
  constructor(private router: Router, private submitService: SubmitService,
              private resolver: ComponentFactoryResolver,private app: AppComponent) {
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
        callback: function (result, brandId,curPage) {
          result.then((id) => {
            me.router.navigate(['/pgoods/brands/upBrand',brandId],{ queryParams: { page: curPage }});
          })
        }
      },
      {
        title: "删除",
        type: "delete",
        size: "xs",
        callback: function (result, brandId,curPage) {
          result.then((id) => {
            let url = '/goodsBrand/deleteBrand';
            let data = {id: brandId};
            me.submitService.delRequest(url,data);
            me.queryDatas(curPage);
          })
        }
      }
    ];
  }

  /**
   * 显示窗口组件
   */
  showPopup(){
    let _this = this;
    _this.app.container.clear();// 先清空容器，每次我们需要创建组件时，我们需要删除之前的视图，否则组件容器中会出现多个视图 (如果允许多个组件的话，就不需要执行清除操作 )。
    const factory: ComponentFactory<EditBrandComponent> = _this.resolver.resolveComponentFactory(EditBrandComponent);// PopupComponent是自己创建的弹窗组件
    _this.componentRef = _this.app.container.createComponent(factory);// 调用容器的 createComponent() 方法，该方法内部将调用 ComponentFactory 实例的 create() 方法创建对应的组件，并将组件添加到我们的容器。
    this.componentRef.instance.val = {a:1};// 定义向子组件输入的值
    this.componentRef.instance.output.subscribe(event => console.log(event));// 订阅动态组件的输出值
  }

  /**
   * 修改
   * @param show
   * @param kindId
   */
  changeBrandState(show, brandId, curPage) {
    console.log("█ brandId ►►►",  brandId);
    let state, requestData, requestUrl;
    state = show? 'HIDE':'SHOW';
    requestUrl = '/goodsBrand/updateState';
    requestData = {
      id: brandId,
      state: state
    };
    console.log("█ requestData ►►►",  requestData);
    this.submitService.putRequest(requestUrl, requestData);
    this.queryDatas(curPage);
  }
  changeBrandRecommend(show, brandId, curPage) {
    console.log("█ brandId ►►►",  brandId);
    let brandRecommend, requestData, requestUrl;
    brandRecommend = show? 'N':'Y';
    requestUrl = '/goodsBrand/updateRecommend';
    requestData = {
      id: brandId,
      brandRecommend: brandRecommend
    };
    console.log("█ requestData ►►►",  requestData);
    this.submitService.putRequest(requestUrl, requestData);
    this.queryDatas(curPage);
  }


  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  queryDatas(curPage,event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let requestUrl = '/goodsBrand/getBrandPages';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      brandName: _this.brandName,
      brandInitial: _this.brandInitial,
      brandRecommend: _this.brandRecommend
    };
    console.log("█ requestData ►►►",  requestData);
    _this.brands = new Page(_this.submitService.getData(requestUrl, requestData));
  }


}

