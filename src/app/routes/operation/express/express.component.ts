import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SettingsService} from "../../../core/settings/settings.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-express',
  templateUrl: './express.component.html',
  styleUrls: ['./express.component.scss']
})
export class ExpressComponent implements OnInit {

  private expressListdata;//用来存储快递公司的信息
  private searchKey:string='';//默认查询的分类的名称

  private expressAddbutton:Object;//新增快递公司按钮
  private updatebutton:Object;//修改按钮
  private deletebutton:Object;//删除按钮
  constructor(public service:SubmitService) {}

  ngOnInit() {
    this.updatebutton={
      title:"编辑",
      type: "update"
    };
    this.deletebutton={
      title:"删除",
      type: "delete"
    };
    this.expressAddbutton={
      title:"新增快递公司",
      text:"新增快递公司",
      type: "add"
    };
    /**
     * 初始化的时候获取快递列表的数据
     */
   this.queryExpressList()

  }

  /**
   * 查询快递公司的列表
   */
  queryExpressList(event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {activePage =event.activePage};
    let data={
      curPage:activePage,
      pageSize:8,
      queryKeywords:this.searchKey
    }
    let url='/basicExpress/pageQueryBasicExpress';
    this.expressListdata=new Page(this.service.getData(url,data))
  }

  /**
   * 删除分类 首先进行确认是否删除，删除后刷新页面
   */
  deleteSort(delSortId){
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
        that.queryExpressList()
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
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
    this.service.putRequest(url,data)
  }
}
