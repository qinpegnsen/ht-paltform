import {Component, OnInit} from "@angular/core";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {isNullOrUndefined} from "util";
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
  private addButton;//添加按钮
  private addchildbutton: object//添加子按钮
  private updatebutton: Object;//修改按钮
  private deletebutton: Object;//删除按钮
  private childMenuCode; //菜单编码，查询子集用
  private code: string = '';//默认查询key的子
  private searchkey: string = '';
  private childMenuTitList: Array<any> = []; //菜单级别面包屑
  private data: Page = new Page();

  constructor(private ajax: AjaxService, private dataDictionaryService: DataDictionaryComponentService) {


  }

  ngOnInit() {
    let me = this;
    //按钮配置
    me.addButton = {
      type: "add",
      text: "添加",
      title: '添加'
    };
    me.updatebutton = {
      title: "编辑",
      type: "update"
    };
    me.deletebutton = {
      title: "删除",
      type: "delete"
    };
    me.addchildbutton = {
      title: "添加子按钮",
      type: "add"
    };
    this.queryDatas()
  }

//查询key列表
  searchdata() {
    this.queryDatas()
  }

  /**
   * 查询数据字典信息列表
   * @param event
   */
  public queryDatas(event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let requestData = {
      curPage: activePage,
      pageSize: 8,
      name: this.searchkey
    }
    let res = this.dataDictionaryService.getdataservice(requestData)
    me.data = new Page(res);
  }

  /*
   *删除
   */
  delete(delCodeId) {
    let url = "/datadict/deleteDatadictType";
    let data = {
      code: delCodeId
    }
    this.dataDictionaryService.delCode(url, data)
    this.queryDatas()
  }

  /*
   * 停启用
   * */
  startState(data) {
    if (data.enable == "Y") data.enable = "N"; else data.enable = "Y";
    let url = "/datadict/updateEnable", _this = this;
    if (_this.childMenuTitList.length < 1) url = "/datadict/updateTypeEnable"; //修改数据字典key
    this.ajax.put({
      url: url,
      data: {
        'code': data.code,
        'enable': data.enable
      },
      success: (res) => {
        if (res.success) swal(res.info, '', 'success');
        else swal('操作失败', '', 'error');
      },
      error: (data) => {
        swal('修改功能操作状态失败', 'error');
      }
    });
  }

  /**
   * 根据分类的父id查询子分类
   * @param parentId
   */
  queryChildSortList(childCode?, menuName?, isTit?: boolean) {
    let me = this, num = 0;
    if (isNullOrUndefined(childCode)) {
      me.childMenuCode = null, me.childMenuTitList = []; //清空子集查询
      me.queryDatas();
      return;
    } else {
      me.childMenuCode = childCode;
      let item = {name: menuName, code: childCode};
      if (!isTit) {
        me.childMenuTitList.push(item); //非点击面包屑路径时，添加面包屑
      }
      else { //点击面包屑路径时，提出点击地址后的面包屑路径
        for (var i = 0; i < me.childMenuTitList.length; i++) {  //获取点击面包屑的路径地址下标
          if (item.code == me.childMenuTitList[i].code) num = i;
        }
        me.childMenuTitList.splice(num + 1); //剔除下标后的路径
      }
    }
    let data = {
      curPage: 1,
      pageSize: 6,
      code: childCode
    }
    let url = "/datadict/querryDatadictList";
    let result = me.dataDictionaryService.queryData(url, data);
    me.data = result;
  }

  /**
   * 返回上一级菜单列表
   */
  goBackMenu() {
    this.queryChildSortList();
  }

}
