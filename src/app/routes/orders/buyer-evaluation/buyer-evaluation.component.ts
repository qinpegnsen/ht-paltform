import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');
@Component({
  selector: 'app-buyer-evaluation',
  templateUrl: './buyer-evaluation.component.html',
  styleUrls: ['./buyer-evaluation.component.scss']
})
export class BuyerEvaluationComponent implements OnInit {

  private data: Page = new Page();
  private deletebutton:object;//删除按钮
  private custName:any;
  constructor(private submit:SubmitService) {

  }
    ngOnInit() {
    let me=this;
    me.deletebutton = {
      title: "删除",
      type: "delete",
      text:'删除'
    };
      this.qeuryAllService(1);
  }

  /**
   * 买家查询分页
   * @param curPage
   * @param event
   */
  qeuryAllService(curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let url = "/commentGoods/queryCommnetGoodsAdmin";
    let data={
      curPage: activePage,
      pageSize:10,
      custName:this.custName,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
  }


  /**
   * 根据买家名搜索评价
   */
  search(){
    this.qeuryAllService(1);
  }

  /**
   * 删除买家评价
   */
  deleteCount(curPage,delid) {
    let me=this;
    let url = "/commentGoods/deleteCommentGoods";
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
        me.qeuryAllService(curPage); //更新
      }
    );
  }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(data:any){
    data.isShow = !data.isShow;
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event, i){
    i.style.display = 'block';
    i.style.top = event.clientY + 'px';
    i.style.left = (event.clientX + 30) + 'px';
    // console.log("█ i.style.top = 100 ►►►",  i.style.top);
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }
}

