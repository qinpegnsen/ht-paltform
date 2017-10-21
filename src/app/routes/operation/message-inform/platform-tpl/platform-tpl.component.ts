import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {OperationService} from "../../operation.service";
import {Page} from "../../../../core/page/page";
import {isNullOrUndefined} from "util";

const swal = require('sweetalert');

@Component({
  selector: 'app-platform-tpl',
  templateUrl: './platform-tpl.component.html',
  styleUrls: ['./platform-tpl.component.scss']
})
export class PlatformTplComponent implements OnInit {

  private addbutton:Object;                              //新增平台消息模板按钮
  private platformTplData:any;                           //平台模板的数据
  private updatebutton:Object;                           //修改按钮
  private deletebutton:Object;                           //删除按钮
  private curType:any;                                   //弹框的类型
  private curTplCode:number;                             //当前的模板编码
  private curPage:number;                                //当前的页面
  constructor(public operationService:OperationService) { }

  /**
   * 1 对按钮进行赋值
   * 2 获取模板的列表
   */
  ngOnInit() {
    this.addbutton={
      title:"新增平台模板",
      text:"新增平台模板",
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
    this.queryPlatformTpl(1);
  }

  /**
   * 查询平台的模板
   */
  queryPlatformTpl(curPage,event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let url='/notifyAdminTpl/pageQuery';
    let data={
      curPage:activePage,
      pageSize:10,
      sortColumns:'',
      tplCode:'',
      tplName:'',
    };
    this.platformTplData=new Page(this.operationService.linkGoods(url,data));
  }

  /**
   * 删除模板 首先进行确认是否删除，删除后刷新页面
   */
  deleteTpl(delSortId,curPage){
    let that=this;
    swal({
      title: "您确定要删除吗？",
      text: "您确定要删除这个模板？",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: '取消',
      closeOnConfirm: false,
      confirmButtonText: "确认",
      confirmButtonColor: "#ec6c62"
    },function(isConfirm){
      if (isConfirm) {
        swal.close(); //关闭弹框
        let url='/notifyAdminTpl/deleteNotifyAdminTpl';
        let data={
          id:delSortId
        }
        that.operationService.delRequest(url,data)
        that.queryPlatformTpl(curPage)
      }
    });
  }

  /**
   * 修改模板
   */
  updateTpl(tplCode,curPage){
    this.curType = 'update';
    this.curTplCode=tplCode;
    this.curPage=curPage;
  }

  /**
   * 新增模板
   */
  addTpl(){
    this.curType = 'add';
  }

  /**
   * 提交
   * @param data
   */
  getTplData(data) {
    this.curType = null;//输入属性发生变化的时候，弹窗才会打开，所以每次后来都清空，造成变化的迹象
    this.queryPlatformTpl(this.curPage)
  }
}
