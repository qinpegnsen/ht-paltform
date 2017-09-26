import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
import {AddDataComponent} from "../add-data/add-data.component";
const swal = require('sweetalert');
@Component({
  selector: 'app-basic-properties',
  templateUrl: './basic-properties.component.html',
  styleUrls: ['./basic-properties.component.scss']
})
export class BasicPropertiesComponent implements OnInit {
  private addbuttons;//添加按钮
  private updatebuttons: Object;//修改按钮
  private deletebuttons: Object;//删除按钮

  private kindList;// 分类列表
  private kindId:string;
  public data: Page = new Page();

  private showAddWindow:boolean = false;
  private showUpdateWindow:boolean = false;

  constructor( private submit: SubmitService,private goods: GoodsService,private childComp: AddDataComponent) { }

  ngOnInit() {
    let me = this;
    me.kindList = me.goods.getKindList(); //获取分类列表
    //按钮配置
    me.addbuttons = {
      type: "add",
      title: '添加',
      text:'添加基本属性'
    };
    me.updatebuttons = {
      title: "编辑",
      type: "update"
    };
    me.deletebuttons = {
      title: "删除",
      type: "delete"
    };
    this.queryDatas();
  }
  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.kindId = data.kindId;
    this.queryDatas()
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  queryDatas(event?: PageEvent) {
    let _this = this;
    let requestUrl = '/goodsEnum/queryBaseEnumList';
    let requestData = {
      kindId:_this.kindId,
    };
    let result=_this.submit.getData(requestUrl, requestData);
    _this.data = result;
  }


  //删除
  delete(delid) {
    let me=this;
    let url = "/goodsEnum/deleteGoodsEnum";
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
        me.queryDatas(); //更新
      }
    );
  }

  addNewData() {
    this.showAddWindow = true;
  }
  updateNewData() {
    this.showUpdateWindow = true;
  }
  /**
   * 发货回调函数
   * @param data
   */
  getAddDataResult(data) {
    this.showAddWindow = false;
    if(data.type == 'success') this.queryDatas()
  }
  getUpdateResult(data) {
    this.showUpdateWindow = false;
    if(data.type == 'success') this.queryDatas()
  }


}