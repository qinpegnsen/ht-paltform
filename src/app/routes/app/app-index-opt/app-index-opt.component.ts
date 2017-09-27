import { Component, OnInit } from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {Page} from '../../../core/page/page';
import {AppIndexOptService} from './app-index-opt.service';
import {ActivatedRoute} from '@angular/router';
const swal = require('sweetalert');

@Component({
  selector: 'app-app-index-opt',
  templateUrl: './app-index-opt.component.html',
  styleUrls: ['./app-index-opt.component.scss']
})
export class AppIndexOptComponent implements OnInit {
  private addButton;//新增移动端首页操作类型按钮配置
  private updatebutton;//修改移动端首页操作类型按钮配置
  private deletebutton;//删除移动端首页操作类型按钮配置
  private controlData;
  private id;//获取删除时需要的id

  constructor(private AppIndexOptService:AppIndexOptService,private routeInfo:ActivatedRoute) {
    let _this = this;

  }

  ngOnInit() {
    let _this = this;

    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    _this.addButton = {
      type:"add",
      text:"新增操作类型",
      title:'新增移动端首页操作类型',
    };
    _this.updatebutton = {
      type:"update",
      title:'修改移动端首页操作类型',
    };
    _this.deletebutton = {
      type:"delete",
      title:'删除移动端首页操作类型',
    };

    _this.getAgentList();
  }


  /**
   * 获取移动端首页操作类型列表
   * @param event
   */
  public getAgentList(){
    let _this = this;
    let data={
    }
    let url= "/phone/indexOptType/list";
    console.log("█ 1 ►►►",  1);

    this.controlData=this.AppIndexOptService.controlDatas(url,data);
    console.log("█ this.controlData ►►►",  this.controlData);
  }

  /**
   * 删除移动端首页操作类型列表
   * @param event
   */
  delete(delCodeId) {
    let _this = this, url: string = "/phone/indexOptType/delete", data: any;
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
        data = {
          id:delCodeId
        }
        console.log(data)
        _this.AppIndexOptService.delCode(url, data); //删除数据
        _this.getAgentList()//实现刷新
      }
    );
  }


}
