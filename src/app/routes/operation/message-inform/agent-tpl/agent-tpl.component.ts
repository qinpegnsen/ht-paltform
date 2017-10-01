import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-tpl',
  templateUrl: './agent-tpl.component.html',
  styleUrls: ['./agent-tpl.component.scss']
})
export class AgentTplComponent implements OnInit {

  private addbutton:Object;                                       //新增代理商消息模板按钮

  constructor() { }

  /**
   * 1 对按钮进行赋值
   * 2 获取模板的列表
   */
  ngOnInit() {
    this.addbutton={
      title:"新增代理商模板",
      text:"新增代理商模板",
      type: "add"
    };

  }

}
