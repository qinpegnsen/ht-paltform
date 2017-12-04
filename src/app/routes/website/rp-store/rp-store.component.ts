import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined} from "util";
import {WebstiteService} from "../webstite.service";

const swal = require('sweetalert');

@Component({
  selector: 'app-rp-store',
  templateUrl: './rp-store.component.html',
  styleUrls: ['./rp-store.component.scss']
})
export class RpStoreComponent implements OnInit {

  public RpStoreData;                //红包企业的数据
  public addRpStore:any;             //新增红包企业
  public updatebutton:any;           //修改按钮
  public curPage:any;                 //当前的页码
  public epSubname:any;               //企业的简称
  public epCode:any;                   //企业的编码
  public storeCode:any;                //店铺的编码

  constructor(public webstiteService:WebstiteService) {}

  /**
   * 1.获取红包列表的数据
   * 2.对按钮进行配置
   */
  ngOnInit() {
    this.addRpStore={
      title:"新增红包企业",
      text:"新增红包企业",
      type: "add-thc"
    };
    this.updatebutton={
      title:"编辑",
      type: "update"
    };
    this.queryRpStoreList(1)
  }

  /**
   * 红包列表的数据
   */
  queryRpStoreList(curPage,event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    this.curPage=activePage;
    let data={
      curPage:activePage,
      pageSize:10,
      epSubname:this.epSubname,
      epCode:this.epCode,
      storeCode:this.storeCode
    };
    let url='/rpStore/queryRpStoreAdmin';
    this.RpStoreData=new Page(this.webstiteService.queryRpStoreAdmin(url,data))
  }

  /**
   * 修改红包企业的状态（冻结还是正常）
   */
  changeState(item){
    if(item.state=="NORMAL"){
      item.state="FREEZE"
    }else if(item.state=="FREEZE"){
      item.state="NORMAL"
    }
    let data={
      id:item.id,
      state:item.state
    };
    let url= "/rpStore/updateRpStoreState";
    this.webstiteService.updateRpStoreState(url,data);
  }

  /**
   * 当子组件注销的时候
   */
  onDeactivate(){
    this.queryRpStoreList(this.curPage);
  }
}
