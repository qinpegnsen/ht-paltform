import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-tpl',
  templateUrl: './agent-tpl.component.html',
  styleUrls: ['./agent-tpl.component.scss']
})
export class AgentTplComponent implements OnInit {

  private expressAddbutton:Object;     //新增快递公司按钮

  constructor() { }

  /**
   * 1 对按钮进行赋值
   * 2 获取模板的列表
   */
  ngOnInit() {
    this.expressAddbutton={
      title:"新增快递公司",
      text:"新增快递公司",
      type: "add"
    };
  }

}
