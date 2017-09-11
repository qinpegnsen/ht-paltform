import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "app/core/page/page";
import {isUndefined} from "util";
import {PageEvent} from "angular2-datatable";
import {GoodsService} from "../goods.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  private addButton;
  private buttons;
  public goodsList: Page = new Page();
  private query:any; // 查询条件
  private kindList;// 分类列表
  private selectKindName:string = '根据分类查询'; //选择的分类的名字
  private goodsAudits:any;  // 商品审核状态列表

  constructor(private router: Router,
              private tools: RzhtoolsService,
              private submit: SubmitService,
              private goodsService: GoodsService) { }

  ngOnInit() {
    let me = this;
    me.query = {
      kindId: '',
      goodsName: '',
      brandName: ''
    }
    me.queryDatas(1); //查询第一页商品列表
    me.kindList = this.goodsService.getKindList(); //获取分类列表
    me.goodsAudits = this.tools.getEnumDataList('1014');  // 商品审核状态列表
    me.addButton = {
      type: 'add',
      text: '发布商品',
    };
    me.buttons = [
      {
        title: "修改",
        type: "update",
        size: "xs",
        callback: function (result, brandId, curPage) {
          result.then((id) => {
            me.router.navigate(['/main/goods/brands/upBrand'], {queryParams: {page: curPage,brandId:brandId}});
          })
        }
      }
    ];
  }

  getKeys(item) {
    return Object.keys(item);
  }
  /**
   * 选择分类
   * @param id  分类id
   * @param name  分类名
   */
  selectKind(id,name){
    this.query.kindId = id;
    this.selectKindName = name;
    this.queryDatas(1)
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
    let requestUrl = '/goodsQuery/query';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      kindId: _this.query.kindId,
      goodsName: _this.query.goodsName,
      brandName: _this.query.brandName,
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
  }


}
