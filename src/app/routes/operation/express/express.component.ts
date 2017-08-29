import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-express',
  templateUrl: './express.component.html',
  styleUrls: ['./express.component.scss']
})
export class ExpressComponent implements OnInit {
  private searchKey:string='';//默认查询的快递公司的名称
  private expressListdata;//用来存储快递公司的信息
  private expressAddbutton:Object;//新增快递公司按钮
  constructor() { }

  ngOnInit() {
    this.expressAddbutton={
      title:"新增快递公司",
      text:"新增快递公司",
      type: "add"
    };
  }

  /**
   * 查询快递公司的列表
   */
  queryExpressList(){
    this.expressListdata=''
  }

}
