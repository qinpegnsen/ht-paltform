import { Component, OnInit } from '@angular/core';
import {AppIndexTplService} from 'app/routes/app/app-index-tpl/app-index-tpl.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-app-index-tpl',
  templateUrl: './app-index-tpl.component.html',
  styleUrls: ['./app-index-tpl.component.scss']
})
export class AppIndexTplComponent implements OnInit {
  private addButton;//新增移动端首页操作类型按钮配置
  private updatebutton;//修改移动端首页操作类型按钮配置
  private deletebutton;//删除移动端首页操作类型按钮配置
  private controlData;

  constructor(private AppIndexTplService:AppIndexTplService,private routeInfo:ActivatedRoute) { }

  ngOnInit() {
    let _this = this;

    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    _this.addButton = {
      type:'add',
      text:'新增操作类型',
      title:'新增移动端首页操作类型',
    };
    _this.updatebutton = {
      type:'update',
      title:'修改移动端首页操作类型',
    };
    _this.deletebutton = {
      type:'delete',
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
    let url= '/phone/indexTpl/list';
    console.log('█ 1 ►►►',  1);

    this.controlData=this.AppIndexTplService.controlDatas(url,data);
    console.log('█ this.controlData ►►►',  this.controlData);

  }
}
