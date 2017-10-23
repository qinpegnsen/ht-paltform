import {Component, OnInit} from "@angular/core";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {isNullOrUndefined} from "util";
import {AjaxService} from "../../../core/services/ajax.service";
import {DataDictionaryComponentService} from "./data-dictionary-component.service";
import {AppComponent} from "../../../app.component";
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
  public childMenuCode; //菜单编码，查询子集用
  public childMenuName; //菜单名称，查询子集用
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
      type: "add-thc",
      text: "添加key",
      title: '添加key'
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
      title: "添加val",
      type: "add"
    };
    this.queryDatas(1)
  }

   //查询key列表
  searchdata() {
    this.queryDatas(1)
  }

  //查询数据字典信息列表
  public queryDatas(curPage,event?: PageEvent) {
    let me = this, activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      name: this.searchkey
    }
    let res = this.dataDictionaryService.getdataservice(requestData)
    me.data = new Page(res);
  }

  //删除
  delete(delCodeId) {
    let _this = this, url: string = "/datadict/deleteDatadictType", data: any,length:number = _this.childMenuTitList.length;
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
          if (length < 1) {
            data = {
              code: delCodeId
            }
          } else {
            url = "/datadict/deleteDatadict";
            data = {
              code: delCodeId
            }
          }
        _this.dataDictionaryService.delCode(url, data); //删除数据
        if(length<1) _this.queryDatas(this.curPage); //更新（第一层）
        else _this.queryChildSortList(_this.childMenuCode,_this.childMenuName,true,this.curPage); //更新（第二层）
      }
    );
  }

  //停启用
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
        if (res.success) AppComponent.rzhAlt("success",res.info);
        else AppComponent.rzhAlt("error","操作失败");
      },
      error: (data) => {
        AppComponent.rzhAlt("error","修改功能操作状态失败");
      }
    });
  }

  //根据分类的父id查询子分类
  queryChildSortList(childCode ?, menuName ?, isTit ?: boolean,event?: PageEvent) {
    let me = this, num = 0;
    let activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    if (isNullOrUndefined(childCode)) {
      me.childMenuCode = null, me.childMenuName = null, me.childMenuTitList = []; //清空子集查询
      me.queryDatas(1);
      return;
    } else {
      me.childMenuCode = childCode;
      me.childMenuName = menuName;
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
      curPage: activePage,
      pageSize: 10,
      code: childCode
    }
    let url = "/datadict/querryDatadictList";
    let res = me.dataDictionaryService.queryData(url, data);
    me.data = new Page(res);
  }

  // 返回上一级菜单列表
  goBackMenu() {
    this.queryChildSortList();
  }

}
