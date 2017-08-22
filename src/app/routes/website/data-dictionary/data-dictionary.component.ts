import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {isNull} from "util";
import {AjaxService} from "../../../core/services/ajax.service";
import {DataDictionaryComponentService} from "./data-dictionary-component.service";
const swal = require('sweetalert');
@Component({
  selector: 'app-data-dictionary',
  templateUrl: './data-dictionary.component.html',
  styleUrls: ['./data-dictionary.component.scss'],
  providers: [DataDictionaryComponentService]
})
export class DataDictionaryComponent implements OnInit {
  private addButton;
  private data: Page = new Page();
  private buttonListConfig: Array<object>;  //多按钮配置
  constructor(private ajax:AjaxService,private dataDictionaryService:DataDictionaryComponentService) {
    //多按钮配置
    var _this = this;
    this.buttonListConfig = [
      {
        title: "编辑",
        type: "update",
      },
      {
        title: "删除",
        type: "delete",
        // callback: function (result) {
        //   result.then((id) => {
        //     _this.showMsg("删除", id);
        //   })
        // }
      },


    ];
  }

  ngOnInit() {
    let me = this;
    //按钮配置
    me.addButton = {
      type:"add",
      text:"添加机构",
      title:'添加机构'
    };
    this.queryDatas()
  }

  public queryDatas(event?:PageEvent) {
    let me = this,activePage = 1;
    if(typeof event !== "undefined") activePage =event.activePage;
    let requestData = {
      curPage: activePage,
      pageSize:8,
      enable:"Y"
    }
    let res = this.dataDictionaryService.getdataservice(requestData)
    me.data = new Page(res);
  }

  startState(data) {
    if (data.enable == "Y") {
      data.enable = "N"
    } else if (data.enable == "N") {
      data.enable = "Y"
    }
    this.ajax.put({
      url: '/limitOpt/updateState',
      data: {
        'optCode': data.code,
        'state': data.enable
      },
      success: (data) => {
        if (data.enable == "Y") {
          swal('启动成功', '', 'success');
        } else if (data.enable == "N") {
          swal('停用成功', '', 'success');
        }
      },
      error: (data) => {
        swal('修改功能操作状态失败', 'error');
      }
    });
  }
}
