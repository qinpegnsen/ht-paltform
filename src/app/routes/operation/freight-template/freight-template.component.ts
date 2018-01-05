import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {FreightTemplateService} from "./freight-template.service";
import {Page} from "../../../core/page/page";
import {SessionService} from "../session.service";
import {SubmitService} from '../../../core/forms/submit.service';
import {GoodsService} from '../../goods/goods.service';
import {Setting} from '../../../core/settings/setting';
import {SelectComponent} from 'ng2-select';
const swal = require('sweetalert');

@Component({
  selector: 'app-freight-template',
  templateUrl: './freight-template.component.html',
  styleUrls: ['./freight-template.component.scss'],
  providers:[FreightTemplateService,SessionService]
})
export class FreightTemplateComponent implements OnInit ,OnDestroy{
  public urlChange;
  public addButton;//新增运费模板按钮配置
  public updatebutton;//修改运费模板按钮配置
  public deletebutton;//删除运费模板按钮配置
  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示
  public areas:Page= new Page();
  public stores: Array<any> = new Array();//店铺列表
  public table = {
    curPage:1,
    lastPage:true,
    needCountQuery:false,
    optObject:null,
    optObjectList:null,
    pageSize:20,
    params:{},
    sortColumns:null,
    totalPage:1,
    totalRow:5,
    voList:[]
  };
  public storeCode: string='';//查询店铺编码
  public voList: any;   //店铺列表列表

  @ViewChild('allStores') public allStores: SelectComponent;

  //监听选择店铺组件

  constructor(public router:Router,public FreightTemplateService:FreightTemplateService, public submit: SubmitService,public goods:GoodsService) {

  }

  ngOnInit() {
    let _this = this;
    _this.querySoterLists();
    _this.stores = _this.goods.getAllStores();
    _this.allStores.active = [{id: Setting.SELF_STORE, text: '三楂红平台自营店'}];
    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    _this.addButton = {
      type:"add-thc",
      text:"新增运费模板",
      title:'新增运费模板',
    };
    _this.updatebutton = {
      type:"update",
      text:"修改",
      title:'修改运费模板',
      size:'xs',
    };
    _this.deletebutton = {
      type:"delete",
      text:"删除",
      title:'删除运费模板',
      size:'xs',
    };


    /**
     * 路由事件用来监听地址栏的变化
     * 1.当添加运费模板出现的时候，运费模板列表组件隐藏
     * 2.路由变化的时候，刷新页面
     */
   _this.urlChange =  _this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          console.log(event.url)
          if(event.url.indexOf('linkType')>0){
            _this.flag=false;
          }else if(event.url=='/main/operation/freight-template'){
            _this.flag=true;
          }
        }
      });
    _this.queryList()//获取费模板列表信息
  }

  /**
   * 取消订阅，要不然一直执行
   */
  ngOnDestroy(){
    this.urlChange.unsubscribe()
  }


  /**
   * 选择店铺
   * @param value
   */
  selectedStore(value: any): void {
    this.storeCode = value.id;
  }

  /**
   * 查询运费模板列表信息
   * @param event
   */
  public queryList() {
    let data={storeCode:this.storeCode,level:1}
    let url= "/expressTpl/queryByStoreCode";
    let result = this.FreightTemplateService.controlDatas(url,data);
    console.log("█ data ►►►", data );

    if(isNullOrUndefined(result)){

    }else{
      this.table.voList = result.data;
    }
    this.areas = new Page(this.table);
  }

  /**
   * 查询店铺列表
   */
  querySoterLists(){
    let _this = this, activePage = 1;
    let requestUrl = '/stores/query';
    let requestData = {
      isPlatShop:'N'
    };
    _this.voList = _this.submit.getData(requestUrl, requestData).voList;
    console.log("█ _this.voList  ►►►",  _this.voList );
  }


  /**
   * 删除运费模板信息信息
   * @param event
   */
  delete(delCodeId) {
    let _this = this, url: string = "/expressTpl/delteStoreExpressTpl", data: any;
    swal({
        title: '确认删除此信息？(如果有商品正在使用此模板，商品默认固定运费！)',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        data = {
          id:delCodeId
        }
        console.log(data)
        _this.FreightTemplateService.delCode(url, data); //删除数据
       _this.queryList();//实现刷新
      }
    );
  }
}
