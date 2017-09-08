import { Component, OnInit } from '@angular/core';
const swal = require('sweetalert');
@Component({
  selector: 'app-help-interlocution',
  templateUrl: './help-interlocution.component.html',
  styleUrls: ['./help-interlocution.component.scss']
})
export class HelpInterlocutionComponent implements OnInit {
  private addButton;//添加按钮
  private addchildbutton: object//添加问题按钮
  private updatebutton: Object;//修改按钮
  private deletebutton: Object;//删除按钮
  private seebutton: Object;//删除按钮
  constructor() { }

  ngOnInit() {
    let me = this;
    //按钮配置
    me.addButton = {
      type: "add",
      text: "添加分类",
      title: '添加分类'
    };
    me.updatebutton = {
      title: "修改",
      type: "update"
    };
    me.deletebutton = {
      title: "删除",
      type: "delete"
    };
    me.addchildbutton = {
      title: "添加问题",
      type: "add"
    };
    me.seebutton = {
      title: "查看",
      type: "add"
    };
  }

  //删除
  deleteCount(delid) {
    let me=this;
    let url = "/goodsUnit/deleteGoodsUnit";
    let data={
      id:delid
    }
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
        // me.submit.delRequest(url, data); //删除数据
        // me.qeuryAllService(); //更新
      }
    );
  }
}
