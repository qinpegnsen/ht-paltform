import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {asQueryList} from "@angular/core/src/view";
import {isNullOrUndefined} from "util";
import {FreightTemplateService} from "./freight-template.service";
import {Page} from "../../../core/page/page";
import {SessionService} from "../session.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-freight-template',
  templateUrl: './freight-template.component.html',
  styleUrls: ['./freight-template.component.scss'],
  providers:[FreightTemplateService,SessionService]
})
export class FreightTemplateComponent implements OnInit {
  private addButton;//新增运费模板按钮配置
  private updatebutton;//修改运费模板按钮配置
  private deletebutton;//删除运费模板按钮配置
  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示
  private areas:Page= new Page();
  private table = {
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
  }

  constructor(private router:Router,private FreightTemplateService:FreightTemplateService,private SessionService:SessionService) {

  }

  ngOnInit() {
    let _this = this;
    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    _this.addButton = {
      type:"add",
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
    _this.router.events
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
   * 查询运费模板列表信息
   * @param event
   */
  public queryList() {
    let data={storeCode:'SZH_PLAT_SELF_STORE',level:1}
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
   * 删除运费模板信息信息
   * @param event
   */
  delete(delCodeId) {
    let _this = this, url: string = "/expressTpl/delteStoreExpressTpl", data: any;
    swal({
        title: '确认删除此信息？',
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
        let datas={id:delCodeId}
        let urls= "/expressTpl/queryByStoreCode";
        _this.FreightTemplateService.controlDatas(urls,datas);//实现局部刷新
      }
    );
  }
}
