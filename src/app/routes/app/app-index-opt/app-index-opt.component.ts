import { Component, OnInit } from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {Page} from '../../../core/page/page';
import {AppIndexOptService} from './app-index-opt.service';

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

  constructor(private AppIndexOptService:AppIndexOptService) {

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



}
