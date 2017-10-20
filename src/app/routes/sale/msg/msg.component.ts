import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {

  private addbuttons:object;//添加按钮
  private updatebuttons:object;//修改按钮
  constructor(private submit:SubmitService) { }
  private data: Page=new Page();
  ngOnInit() {
    let me=this;
    me.addbuttons = {
      type: "add-thc",
      title: '添加',
      text:'添加问题'
    };
    me.updatebuttons = {
      type: "update",
      title: '编辑',
      text:'编辑'
    };
  }

  /**
   * 根据原因搜索
   */
  search(){
    this.queryAll();
    }

  /**
   * 查询分页
   */
  queryAll(event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/goodsUnit/queryPage";
    let data={
      curPage: activePage,
      pageSize:10,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
  }

}
