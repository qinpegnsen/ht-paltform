import {Component,OnInit} from '@angular/core';
import {Location} from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-add-red-package',
  templateUrl: './add-red-package.component.html',
  styleUrls: ['./add-red-package.component.scss']
})
export class AddRedPackageComponent implements OnInit {

  constructor(public location: Location) {
  }

  ngOnInit() {

  }


  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow() {
    this.location.back();
  }


  /**
   * 显示编辑框
   * @param target
   */
  showEditBox(target) {
    $(target).removeClass('hide')
  }

  /**
   * 显示编辑框
   * @param target
   */
  hideEditBox(target) {
    $(target).addClass('hide')
  }

  /**
   * 确认发货
   */
  delivery() {
    this.location.back();
  }

}
