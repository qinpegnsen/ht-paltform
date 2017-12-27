import { Component, OnInit } from '@angular/core';
import {AppIndexTplService} from 'app/routes/app/app-index-tpl/app-index-tpl.service';
import {ActivatedRoute} from '@angular/router';
const swal = require('sweetalert');

@Component({
  selector: 'app-app-index-tpl',
  templateUrl: './app-index-tpl.component.html',
  styleUrls: ['./app-index-tpl.component.scss']
})
export class AppIndexTplComponent implements OnInit {
  public addButton;//新增移动端首页操作类型按钮配置
  public updatebutton;//修改移动端首页操作类型按钮配置
  public deletebutton;//删除移动端首页操作类型按钮配置
  public controlData;

  constructor(public AppIndexTplService:AppIndexTplService,public routeInfo:ActivatedRoute,public AppIndexTplServiceL:AppIndexTplService) { }

  ngOnInit() {
    let _this = this;

    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    _this.addButton = {
      type:'add-thc',
      text:'新增首页模板',
      title:'新增首页模板',
    };
    _this.updatebutton = {
      type:'update',
      title:'修改首页模板',
    };
    _this.deletebutton = {
      type:'delete',
      title:'删除首页模板',
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

    this.controlData=this.AppIndexTplService.controlDatas(url,data);
  }

  /**
   * 删除移动端首页操作列表
   * @param event
   */
  delete(delCodeId) {
    let _this = this, url: string = "/phone/indexTpl/delete", data: any;
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
        _this.AppIndexTplService.delCode(url, data); //删除数据
        _this.getAgentList()//实现刷新
      }
    );
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event, i) {
    i.style.display = 'block';
    i.style.top = (event.clientY + 15) + 'px';
    i.style.left = (event.clientX + 20) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }
}
