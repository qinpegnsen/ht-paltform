import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-index-opt',
  templateUrl: './app-index-opt.component.html',
  styleUrls: ['./app-index-opt.component.scss']
})
export class AppIndexOptComponent implements OnInit {
  private addButton;//新增移动端首页操作类型

  constructor() {

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
  }

}
