import {Component, OnInit, ViewChild} from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AjaxService} from "../../../core/services/ajax.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
import {isNullOrUndefined, isUndefined} from "util";
import {GoodsService} from "../goods.service";
import {SelectComponent} from "ng2-select";
@Component({
  selector: 'app-wholesale-merchandise-management',
  templateUrl: './wholesale-merchandise-management.component.html',
  styleUrls: ['./wholesale-merchandise-management.component.scss']
})
export class WholesaleMerchandiseManagementComponent implements OnInit {

  private data: Page = new Page();
  private goodsName: any = ''; //商品名
  private brandName: any = ''; //品牌名
  private kindId: any = ''; //品牌名
  public brandList:any;   //品牌列表
  public _goods = [];
  private selectedBlandStr:any;
  public value: any = {};
  constructor(private ajax: AjaxService,private submit: SubmitService,
              private goods: GoodsService,private router:Router) { }

  ngOnInit() {
    this.qeuryAllService();
    this.getBrandList()
  }


  /**
   * 品牌名称
   */
  search(){
    this.qeuryAllService();
  }

  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.kindId = data.kindId;
    this.qeuryAllService();
    this.getBrandList(this.kindId)
  }

  /**
   * 品牌名搜索
   */
  refreshValue(value: any): void {
    this.brandName = value.text;
    this.qeuryAllService();
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
  qeuryAllService(event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/goodsQuery/querySku";
    let data={
      curPage: activePage,
      pageSize:10,
      kindId:me.kindId,
      goodsName:me.goodsName,
      brandName:me.brandName,
      state: '',
      goodsAudit: '',
      sortColumns:'',
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
    console.log(me.data)
  }

  /**
   * 是否允许批发
   */
  startState(data) {
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
          console.log("█ res ►►►",  res);
          if (res.success) AppComponent.rzhAlt("success",res.info);
          else AppComponent.rzhAlt("error",res.info);
          _this.qeuryAllService()
        },
        error: (data) => {
          AppComponent.rzhAlt("error",data.info);
          _this.qeuryAllService()
        }
      });
    }else if(isNullOrUndefined(data.goodsPrice.batchPrice)){
      AppComponent.rzhAlt("warning",'请先设置价格');
      _this.qeuryAllService()
    }
  }

  /**
   * 批发价修改
   */
  submita(goodsCode,i) {
      let url = '/goodsEdit/updateBatchPrice';
      let data = {
        goodsCode:goodsCode,
        batchPrice:this._goods[i],
      }
      console.log("█ data ►►►",  data.batchPrice);
      this.submit.putRequest(url, data);
       this.qeuryAllService();
  }
}
