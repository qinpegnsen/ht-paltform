import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {

  private addbuttons:object;//添加按钮
  constructor() { }

  ngOnInit() {
    let me=this;
    me.addbuttons = {
      type: "add",
      title: '添加',
      text:'添加问题'
    };
  }


}
