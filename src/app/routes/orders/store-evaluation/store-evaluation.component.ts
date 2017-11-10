import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
const swal = require('sweetalert');
@Component({
  selector: 'app-store-evaluation',
  templateUrl: './store-evaluation.component.html',
  styleUrls: ['./store-evaluation.component.scss']
})
export class StoreEvaluationComponent implements OnInit {
  public data: Page = new Page();
  public deletebutton:object;//删除按钮
  public goodsName:any;
  constructor(public submit:SubmitService) {

  }

  ngOnInit() {
    let me=this;
    me.deletebutton = {
      title: "删除",
      type: "delete",
      text:'删除'
    };
    this.qeuryAll(1);
  }

  /**
   * 查询买家评价分页
   */
  qeuryAll(curPage,event?: PageEvent,){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/goodsQuery/querySku";
    let data={
      curPage: activePage,
      pageSize:10,
      goodsName:me.goodsName,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
    console.log("█ result ►►►",  result);
  }

  /**
   * 根据买家名搜索评价
   */
  search(){
    this.qeuryAll(1);
  }

  /**
   * 删除买家评价
   */
  deleteCount(curPage,delid) {
    let me=this;
    let url = "";
    let data={
      id:delid
    }
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
        me.submit.delRequest(url, data); //删除数据
        me.qeuryAll(curPage); //更新
      }
    );
  }

}
