import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../core/page/page";
import {ActivatedRoute,Router} from '@angular/router';
import {AgentpersonService} from "./agentperson.service";
const swal = require('sweetalert');
import {NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-agentperson',
  templateUrl: './agentperson.component.html',
  styleUrls: ['./agentperson.component.scss'],
  providers:[AgentpersonService]
})
export class AgentpersonComponent implements OnInit {
  private addButton;//新增代理商按钮配置
  private updatebutton;//修改代理商信息按钮
  private deletebutton;//删除代理商信息按钮
  private updatebuttono;//修改密码按钮
  private details;//查看代理商详情
  private updatebuttonio;//上传图片按钮
  private queryId:number;//获取添加，修改的ID
  private organ={}
  private controlData:Page = new Page();
  private id;//获取删除时需要的id
  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示
  private areaCode: string = '';// 代理商区域编码
  private agentName: string = '';// 代理商名称
  public agentCode:string;//获取代理商编码


  constructor(private ajax:AjaxService,private routeInfo:ActivatedRoute,private router:Router,private AgentpersonService:AgentpersonService) {

  }

  ngOnInit() {
    let _this = this;
    _this.queryId = _this.routeInfo.snapshot.queryParams['id'];
    _this.agentCode = this.routeInfo.snapshot.queryParams['agentCode'];

    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    _this.addButton = {
      type:"add-thc",
      text:"新增代理商",
      title:'新增代理商',
    };
    _this.updatebutton = {
      type:"update",
      title:'修改代理商',
      size: 'xs'
    };
    _this.deletebutton = {
      type:"delete",
      title:'删除代理商',
      size: 'xs'
    };
    _this.updatebuttono = {
      type:"search",
      title:'修改密码',
      size: 'xs'
    };
    _this.updatebuttonio = {
      type:"upload",
      title:'上传图片',
      size: 'xs'
    };
    _this.details = {
      type:"details",
      title:'查看代理商详情',
      size: 'xs'
    };


    /**
     * 路由事件用来监听地址栏的变化
     * 1.当添加代理商出现的时候，代理商列表组件隐藏
     * 2.路由变化的时候，刷新页面
     */
    /*_this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          console.log(event.url)
          if(event.url.indexOf('linkType')>0){
            _this.flag=false;
          }else if(event.url=='/main/agent/agentperson'){
            _this.flag=true;
            _this.getAgentList() //刷新内容页面
          }
        }
      });*/
    this.getAgentList()
  }

  //获取区域数据
  private getAreaData(area){
    let me = this;
    me.organ['areaCode'] = area.areaCode;
    me.getAgentList();
  }


  /**
   * 获取代理商列表
   * @param event
   */
  public getAgentList(event?:PageEvent){
    let _this = this, activePage = 1;
    if(typeof event !== "undefined") {activePage =event.activePage};
    let data={
      curPage:activePage,
      agentName:_this.agentName,
      areaCode:_this.organ['areaCode']
    }
    let url= "/agent/pageQuery";
    this.controlData=this.AgentpersonService.controlDatas(url,data);
  }

  /**
   * 删除代理商信息
   * @param event
   */
  delete(delCodeId) {
    let _this = this, url: string = "/agent/deleteAgent", data: any;
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
        _this.AgentpersonService.delCode(url, data); //删除数据
        /*let datas={id:delCodeId}
        let urls= "/agent/pageQuery";
        this.controlData = _this.AgentpersonService.controlDatas(urls,datas);//实现局部刷新*/
        _this.getAgentList()//实现刷新
      }
    );
  }


  /**
   * 重置代理商密码
   * @param event
   */
  resetPwd(pwd) {
    let _this = this, url: string = "/agent/updateAgentPwdReset", data: any;
    swal({
        title: '确认要重置密码？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        data = {
          'agentCode':pwd
        }
        _this.AgentpersonService.pwd(url, data); //删除数据
        _this.getAgentList()//实现刷新
      }
    );
  }

  /**
   * 查看代理商是否被关闭
   */
  upFiledateState(data) {
    if (data.state == "NORMAL") {
      data.state = "FREEZE"
    } else if (data.state == "FREEZE") {
      data.state = "NORMAL"
    }
    this.ajax.put({
      url: '/agent/updateAgentState',
      data: {
        'agentCode': data.agentCode,
        'state': data.state
      },
      success: () => {
        if (data.state == "NORMAL") {
          swal('开启成功', '', 'success');
        } else if (data.state == "FREEZE") {
          swal('关闭成功', '', 'success');
        }
      },
      error: (data) => {
        swal('开启/关闭，失败', 'error');
      }
    });
  }
}
