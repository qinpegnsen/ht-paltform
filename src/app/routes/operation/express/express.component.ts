import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined} from "util";

const swal = require('sweetalert');

@Component({
  selector: 'app-express',
  templateUrl: './express.component.html',
  styleUrls: ['./express.component.scss']
})
export class ExpressComponent implements OnInit {

  public expressListdata;            //用来存储快递公司的信息
  public searchKey:string='';        //默认查询的分类的名称
  public expressAddbutton:Object;     //新增快递公司按钮
  public updatebutton:Object;         //修改按钮
  public deletebutton:Object;         //删除按钮

  constructor(public service:SubmitService) {}

  /**
   * 1.获取快递列表的数据
   * 2.对按钮进行配置
   */
  ngOnInit() {
    this.expressAddbutton={
      title:"新增快递公司",
      text:"新增快递公司",
      type: "add-thc"
    };
    this.updatebutton={
      title:"编辑",
      type: "update"
    };
    this.deletebutton={
      title:"删除",
      type: "delete"
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
      pageSize:10,
      queryKeywords:this.searchKey
    }
    let url='/basicExpress/pageQueryBasicExpress';
    this.expressListdata=new Page(this.service.getData(url,data))
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
