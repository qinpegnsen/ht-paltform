import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../../core/page/page";
import {OperationService} from "../../operation.service";

const swal = require('sweetalert');

@Component({
  selector: 'app-agent-tpl',
  templateUrl: './agent-tpl.component.html',
  styleUrls: ['./agent-tpl.component.scss']
})

export class AgentTplComponent implements OnInit {
  private addbutton:Object;                                       //新增代理商消息模板按钮
  private updatebutton:Object;                                    //修改按钮
  private deletebutton:Object;                                    //删除按钮
  private agentTplData:any;                                       //代理商模板的数据
  private curType:any;                                            //弹框的类型
  private curTplCode:number;                                      //当前的模板编码

  constructor(public operationService:OperationService) { }

  /**
   * 1 对按钮进行赋值
   * 2 获取模板的列表
   */
  ngOnInit() {
    this.addbutton={
      title:"新增代理商模板",
      text:"新增代理商模板",
      type: "add-thc"
    };
    this.updatebutton={
      title:"编辑",
      type: "update"
    };
    this.deletebutton={
      title:"删除",
      type: "delete"
    };
    this.queryAgentTpl();
  }

  /**
   * 查询平台的模板
   */
  queryAgentTpl(event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {activePage =event.activePage};
    let url='/notifyAgentTpl/pageQuery';
    let data={
      curPage:activePage,
      pageSize:10,
      sortColumns:'',
      tplCode:'',
      tplName:'',
    };
    this.agentTplData=new Page(this.operationService.linkGoods(url,data));
  }

  /**
   * 删除模板 首先进行确认是否删除，删除后刷新页面
   */
  deleteTpl(delSortId){
    let that=this;
    swal({
      title: "您确定要删除吗？",
      text: "您确定要删除这个模板？",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: '取消',
      closeOnConfirm: false,
      confirmButtonText: "确认",
      confirmButtonColor: "#ec6c62"
    },function(isConfirm){
      if (isConfirm) {
        swal.close(); //关闭弹框
        let url='/notifyAgentTpl/deleteNotifyAgentTpl';
        let data={
          id:delSortId
        }
        that.operationService.delRequest(url,data);
        that.queryAgentTpl();
      }
    });
  }

  /**
   * 修改模板
   */
  updateTpl(tplCode){
    this.curType = 'update';
    this.curTplCode=tplCode;
  }

  /**
   * 新增模板
   */
  addTpl(){
    this.curType = 'add';
  }

  /**
   * 弹窗提交
   * @param data
   */
  getTplData(data) {
    this.curType = null;//输入属性发生变化的时候，弹窗才会打开，所以每次后来都清空，造成变化的迹象
    this.queryAgentTpl(data.page)
  }

}
