import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Button} from "selenium-webdriver";

interface ButtonClass {
  btnClass: string;
  iconClass: string;
}
interface ButtonConfig{
  text: string;
  title:string;
  type:string;
  size:string;
  iconsClass:string;
  btnClass:string;
  callback:any;
}

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  private id: any;
  private text: string = ""; //按钮文字
  private title: string = ""; //title文字
  private type: any;   //按钮类型
  private size: any;   //按钮大小
  private iconsClass: string; //自定义按钮图标
  private btnClass: string; //自定义按钮样式
  // private labeled: boolean = true;  //是否开启label
  private class: any; //按钮样式
  private icon: string; //图标样式

  @Input() config: ButtonConfig; //按钮配置
  @Output() callback = new EventEmitter<any>(); //点击事件回调
  @Input() state: string;

  //按钮样式
  public static buttonStyles = {
    "default": "btn-default",
    "primary": "btn-primary",
    "success": "btn-success",
    "info": "btn-info",
    "warning": "btn-warning",
    "danger": "btn-danger",
    "inverse": "btn-inverse",
    "green": "btn-green",
    "purple": "btn-purple",
    "purpleLight": "bg-purple-light",
    "pink": "btn-pink",
    "dark": "bg-gray-dark",
  };

  constructor() {
  }

  ngOnInit() {
    this.id = "buttons_" + Math.random().toString();  //生成随机id
    this.text = this.config.text || "";  //设置按钮文字
    this.title = this.config.title == undefined ? this.text : this.config.title; //设置按钮title
    this.type = this.config.type; //设置按钮类型
    this.size = this.config.size; //设置按钮大小

    this.btnClass = this.config.btnClass || "";   //设置自定义按钮样式
    this.iconsClass = this.config.iconsClass || ""; //设置自定义图标样式
    this.genClass();
  }

  /**
   * 调用事件
   */
  fireCallback() {
    this.callback.emit(Promise.resolve(this.id));
  }


  private genClass() {
    let buttonClass = this.genBtnClass();

    //设置按钮样式
    if (this.btnClass !== "") {
      this.class = this.btnClass;
    } else {
      this.class = "btn " + buttonClass.btnClass + " " + this.genSize();
    }

    //设置图标
    if(this.iconsClass !== ""){
      this.icon = this.iconsClass;

    }else{
      this.icon = buttonClass.iconClass;
    }
  }

  private genBtnClass(): ButtonClass {
    switch (this.type) {
      case "add":
        return {btnClass: ButtonsComponent.buttonStyles.info, iconClass: "fa fa-plus"};
      case "agree":
        return {btnClass: ButtonsComponent.buttonStyles.success, iconClass: "fa fa-check"};
      case "back":
        return {btnClass: ButtonsComponent.buttonStyles.success, iconClass: "fa fa-mail-reply"};
      case "build":
        return {btnClass: ButtonsComponent.buttonStyles.purple, iconClass: "icon-note"};
      case "delete":
        return {btnClass: ButtonsComponent.buttonStyles.danger, iconClass: "fa fa-trash"};
      case "details":
        return {btnClass: ButtonsComponent.buttonStyles.green, iconClass: "icon-magnifier-add"};
      case "download":
        return {btnClass: ButtonsComponent.buttonStyles.default, iconClass: "icon-cloud-download"};
      case "end":
        return {btnClass: ButtonsComponent.buttonStyles.danger, iconClass: "fa fa-minus-circle"};
      case "reject":
        return {btnClass: ButtonsComponent.buttonStyles.danger, iconClass: "fa fa-close"};
      case "search":
        return {btnClass: ButtonsComponent.buttonStyles.primary, iconClass: "icon-magnifier"};
      case "start":
        return {btnClass: ButtonsComponent.buttonStyles.success, iconClass: "icon-lock-open"};
      case "stop":
        return {btnClass: ButtonsComponent.buttonStyles.warning, iconClass: "icon-lock"};
      case "submit":
        return {btnClass: ButtonsComponent.buttonStyles.success, iconClass: "fa fa-check"};
      case "update":
        return {btnClass: ButtonsComponent.buttonStyles.primary, iconClass: "fa fa-pencil"};
      case "upload":
        return {btnClass: ButtonsComponent.buttonStyles.purpleLight, iconClass: "icon-cloud-upload"};
      case "stop":
        return {btnClass: ButtonsComponent.buttonStyles.dark, iconClass: "fa fa-cog"};
    }
  }

  private genSize() {
    switch (this.size) {
      case "lg":
        return "btn-lg";
      case "sm":
        return "btn-sm";
      case "xs":
        return "btn-xs";
      case "md":
        return "";
      default :
        return "btn-sm";
    }
  }


}
