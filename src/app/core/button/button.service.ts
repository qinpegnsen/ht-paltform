import { Injectable } from '@angular/core';

/**
 * 按钮服务，调用服务者，根据传参，获得按钮
 */
@Injectable()
export class ButtonService {

  buttonItems: Array<any>;

  constructor() {
    this.buttonItems = [];
  }

  addButton(items: Array<{
    text: string,   //按钮名称
    link?: string,     // internal route links
    elink?: string,    // used only for external links
    target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
    icon?: string,
    enable?: boolean //是否显示使用
  }>) {
    items.forEach((item) => {
      this.buttonItems.push(item);
    })
  }

  getButton (){
    return this.buttonItems;
  }

}
