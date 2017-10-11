import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
const swal = require('sweetalert');

@Component({
  selector: 'app-sys-notice',
  templateUrl: './sys-notice.component.html',
  styleUrls: ['./sys-notice.component.scss']
})
export class SysNoticeComponent implements OnInit {

  private noticeListdata;              //存储系统公告的信息
  private noticeAddbutton:Object;      //新增公告按钮
  private deletebutton:Object;         //删除按钮
  constructor(public service:SubmitService) {}

  /**
   * 1.获取系统公告列表的数据
   * 2.对按钮进行配置
   */
  ngOnInit() {
    this.noticeAddbutton={
      title:"新增系统公告",
      text:"新增系统公告",
      type: "add"
    };
    this.deletebutton={
      title:"删除",
      type: "delete"
    };
    this.queryNoticeList()

  }

  /**
   * 查询快递公司的列表
   */
  queryNoticeList(event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {activePage =event.activePage};
    let data={
      curPage:activePage,
      pageSize:10
    }
    let url='/announce/queryAnnounce';

    this.noticeListdata=new Page(this.service.getData(url,data));
  }

  /**
   * 删除分类 首先进行确认是否删除，删除后刷新页面
   */
  deleteSort(delId){
    let that=this;
    swal({
      title: "您确定要删除吗？",
      text: "",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: '取消',
      closeOnConfirm: false,
      confirmButtonText: "确认",
      confirmButtonColor: "#ec6c62"
    },function(isConfirm){
      if (isConfirm) {
        swal.close(); //关闭弹框
        let url='/announce/deleteAnnounce';
        let data={
          id:delId
        }
        that.service.delRequest(url,data)
        that.queryNoticeList()
      }
    });
  }

}
