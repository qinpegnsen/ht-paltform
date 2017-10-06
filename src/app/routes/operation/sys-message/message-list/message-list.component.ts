import { Component, OnInit } from '@angular/core';
import {OperationService} from "../../operation.service";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
const swal = require('sweetalert');

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  public orderType: string = '';
  private platformInfoData:any;                           //平台消息的数据
  private deletebutton:Object;                            //删除按钮
  constructor(public operationService:OperationService) { }

  /**
   * 1.对按钮进行赋值
   * 2.调用消息的列表
   */
  ngOnInit() {
    this.deletebutton={
      title:"删除",
      type: "delete"
    };
    this.queryAdminNotify()
  }
  /**
   * 获取通知的消息列表，默认只展示第一页的内容
   */

  queryAdminNotify(event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {activePage =event.activePage};
    let url='/notifyAdmin/pageQuery';
    let data={
      curPage:activePage,
      pageSize:10,
      sortColumns:''
    };
    this.platformInfoData=new Page(this.operationService.linkGoods(url,data));
    console.log("█ this.platformTplData ►►►",  this.platformInfoData);
  }

  /**
   * 修改消息是否已读,然后刷新页面
   *
   */
  updateIsRead(id){
    let url='/notifyAdmin/updateIsRead';
    let data={
      id:id
    };
    this.platformInfoData=this.operationService.updateproblem(url,data);
    this.queryAdminNotify();
  }

  /**
   * 删除模板 首先进行确认是否删除，删除后刷新页面
   */
  deleteTpl(delSortId){
    let that=this;
    swal({
      title: "您确定要删除吗？",
      text: "您确定要删除这条消息？",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: '取消',
      closeOnConfirm: false,
      confirmButtonText: "确认",
      confirmButtonColor: "#ec6c62"
    },function(isConfirm){
      if (isConfirm) {
        swal.close(); //关闭弹框
        let url='/notifyAdmin/deleteById';
        let data={
          id:delSortId
        }
        that.operationService.delRequest(url,data)
        that.queryAdminNotify()
      }
    });
  }
}
