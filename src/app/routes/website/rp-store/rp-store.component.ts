import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined} from "util";

const swal = require('sweetalert');

@Component({
  selector: 'app-rp-store',
  templateUrl: './rp-store.component.html',
  styleUrls: ['./rp-store.component.scss']
})
export class RpStoreComponent implements OnInit {

  private RpStoreData;                //红包企业的数据
  private searchKey:string='';        //默认查询的分类的名称
  private addRpStore:any;             //新增红包企业
  private updatebutton:any;           //修改按钮
  private deletebutton:any;           //删除按钮

  constructor(public service:SubmitService) {}

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
    this.queryExpressList(1)
  }

  /**
   * 查询快递公司的列表
   */
  queryExpressList(curPage,event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let data={
      curPage:activePage,
      pageSize:10
    }
    let url='/rpStore/queryRpStoreAdmin';
    this.RpStoreData=new Page(this.service.getData(url,data))
  }

  /**
   * 删除分类 首先进行确认是否删除，删除后刷新页面
   */
  deleteSort(delSortId,curPage){
    let that=this;
    swal({
      title: "您确定要删除吗？",
      text: "您确定要删除这条数据？",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: '取消',
      closeOnConfirm: false,
      confirmButtonText: "确认",
      confirmButtonColor: "#ec6c62"
    },function(isConfirm){
      if (isConfirm) {
        swal.close(); //关闭弹框
        let url='/basicExpress/deleteBasicExpressById';
        let data={
          id:delSortId
        }
        that.service.delRequest(url,data)
        that.queryExpressList(curPage)
      }
    });
  }

  /**
   * 物流公司是否启用
   */
  isUse(express){
    if(express.isUse=="Y"){
      express.isUse="N"
    }else if(express.isUse=="N"){
      express.isUse="Y"
    }
    let data={
      id:express.id,
      isUse:express.isUse
    }
    let url= "/basicExpress/updateBasicExpress";
    this.service.putRequest(url,data);
  }
}
