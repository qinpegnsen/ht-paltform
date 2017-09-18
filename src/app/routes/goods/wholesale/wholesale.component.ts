import {Component, OnInit, ViewChild} from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AjaxService} from "../../../core/services/ajax.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
import {isNullOrUndefined, isUndefined} from "util";
import {GoodsService} from "../goods.service";
import {PatternService} from "../../../core/forms/pattern.service";

@Component({
  selector: 'app-wholesale',
  templateUrl: './wholesale.component.html',
  styleUrls: ['./wholesale.component.scss']
})
export class WholesaleComponent implements OnInit {

  private data: Page = new Page();
  private goodsName: any = ''; //商品名
  private brandName: any = ''; //品牌名
  private kindId: any = ''; //品牌名
  public brandList:any;   //品牌列表
  public _goods = [];
  public value: any = {};
  constructor(private ajax: AjaxService,private submit: SubmitService,
              private goods: GoodsService,private router:Router,private patterns: PatternService) { }

  ngOnInit() {
    this.qeuryAllService(1);
    this.getBrandList()
  }

  /**
   * 品牌名称
   */
  search(){
    this.qeuryAllService(1);
  }

  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.kindId = data.kindId;
    this.qeuryAllService(1);
    this.getBrandList(this.kindId)
  }

  /**
   * 品牌名搜索
   */
  refreshValue(value: any): void {
    this.brandName = value.text;
    this.qeuryAllService(1);
  }

  /**
   * 选择品牌名
   * @param data  选择分类组件输出数据
   */
  getBrandList(kindId?) {
    if(isUndefined(kindId)) kindId = '';
    let list = this.goods.getBrandListByKind(kindId),newList = [];
    if(!isNullOrUndefined(list)) {
      for(let item of list){
        let obj = {
          id: item.id,
          text: item.brandName,
        }
        newList.push(obj);
      }
    }
    this.brandList = newList;
  }

  /**
   * 批发商品管理--查询分页
   */
  qeuryAllService(curPage,event?: PageEvent,){
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = "/goodsQuery/querySku";
    let data={
      curPage: activePage,
      pageSize:10,
      kindId:me.kindId,
      goodsName:me.goodsName,
      brandName:me.brandName,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
    console.log("█  ►►►",result);
  }

  /**
   * 是否允许批发
   */
  startState(data,curPage) {
    let _this = this, isBatch;
    if(data.isBatch == 'Y') data.isBatch = 'N';
    else data.isBatch = 'Y';
    if(!isNullOrUndefined(data.goodsPrice.batchPrice)&& data.goodsPrice.batchPrice != 0 && data.goodsPrice.batchPrice != ''){
      let url = "/goodsEdit/updateIsBatch";
      this.ajax.put({
        url: url,
        data: {
          goodsCode:data.goodsCode ,
          isBatch:data.isBatch,
        },
        success: (res) => {
          if (res.success) AppComponent.rzhAlt("success",res.info);
          else AppComponent.rzhAlt("error",res.info);
          _this.qeuryAllService(curPage)
        },
        error: (data) => {
          AppComponent.rzhAlt("error",data.info);
          _this.qeuryAllService(curPage)
        }
      });
    }else if(isNullOrUndefined(data.goodsPrice.batchPrice)){
      AppComponent.rzhAlt("warning",'请先设置价格');
      _this.qeuryAllService(curPage);
    }
  }

  /**
   * 批发价修改
   */
  submita(goodsCode,i,curPage) {
    let _this=this;
    // if(_this._goods[i]<_this.goodsPrice.memberPrice){
    let url = '/goodsEdit/updateBatchPrice';
    let data = {
      goodsCode: goodsCode,
      batchPrice: this._goods[i],
    }
    _this.submit.putRequest(url, data);
    _this.qeuryAllService(curPage);
  // }else{
    // AppComponent.rzhAlt("error","修改价格失败");
    // }
      console.log("█ this._goods[i] ►►►",  this._goods[i]);

  }
}
