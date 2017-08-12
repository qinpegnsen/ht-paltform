import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent implements OnInit {
  private buttonConfig: object;  //单按钮配置
  private textButtonConfig:object;  //带文字的按钮配置
  private buttonListConfig: Array<object>;  //多按钮配置

  constructor() {
    var _this = this;
    //单按钮配置
    this.buttonConfig = {
      type: "add",
      title: "图标按钮",
    };

    this.textButtonConfig = {
      type: "delete",
      text: "文字按钮",
      callback: function (result) {
        result.then((id) => {
          _this.showMsg("点击带文字按钮", id);
        })
      }
    };


    //多按钮配置
    this.buttonListConfig = [
      {
        text: "添加",
        title: "添加",
        type: "add",
        callback: function (result) {
          result.then((id) => {
            _this.showMsg("添加", id);
          })
        }
      },
      {
        title: "删除",
        type: "delete",
        callback: function (result) {
          result.then((id) => {
            _this.showMsg("删除", id);
          })
        }
      },
      {
        title: "详情",
        type: "details",
        callback: function (result) {
          result.then((id) => {
            _this.showMsg("详情", id);
          })
        }
      },
      {
        title: "暂停",
        type: "stop",
        callback: function (result) {
          result.then((id) => {
            _this.showMsg("暂停", id);
          })
        }
      },
    ];
  }

  ngOnInit() {
  }

  toAdd(promose) {
    var _this = this;
    promose.then((id) => {
      _this.showMsg("单按钮点击", id);
    })
  }

  private showMsg(operation, id) {
    alert("现在执行的是" + operation + "操作，按钮id为:" + id);
  }
}
