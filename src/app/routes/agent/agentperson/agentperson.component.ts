import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../core/page/page";
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-agentperson',
  templateUrl: './agentperson.component.html',
  styleUrls: ['./agentperson.component.scss']
})
export class AgentpersonComponent implements OnInit {
  private addButton;//新增代理商按钮配置
  private updatebutton;//修改代理商信息按钮
  private deletebutton;//删除代理商信息按钮
  private updatebuttono;//修改密码按钮
  private updatebuttonio;//上传图片按钮
  private queryId:number;//获取添加，修改的ID
  private controlData:Page = new Page();


  constructor(private ajax:AjaxService,private routeInfo:ActivatedRoute,private router:Router) {

  }

  ngOnInit() {
    let _this = this;
    _this.queryId = _this.routeInfo.snapshot.queryParams['id'];

    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    this.addButton = {
      type:"add",
      text:"新增代理商",
      title:'新增代理商',
    };
    this.updatebutton = {
      type:"update",
      title:'修改代理商',
      size: 'xs'
    }
    this.deletebutton = {
      type:"delete",
      title:'删除代理商',
      size: 'xs'
    }
    this.updatebuttono = {
      type:"search",
      title:'修改密码',
      size: 'xs'
    }
    this.updatebuttonio = {
      type:"upload",
      title:'上传图片',
      size: 'xs'
    }
    this.controlDatas();//调用获取代理商列表方法
  }


  /**
   * 获取代理商列表
   * @param event
   */
  public controlDatas(event?:PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;

    this.ajax.get({
      url: "/agent/pageQuery",
      data: {
        curPage: activePage,
      },
      success: (data) => {
        console.log("█ data ►►►", data );
        if (!isNull(data)) {
          me.controlData = new Page(data.data);
        }
      },
      error: (data) => {
        console.log("地区获取失败");
      }
    });
  }

}
