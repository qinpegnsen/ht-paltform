import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {WebstiteService} from "../webstite.service";
const swal = require('sweetalert');
declare var $: any;

@Component({
  selector: 'app-add-red-package',
  templateUrl: './add-red-package.component.html',
  styleUrls: ['./add-red-package.component.scss']
})
export class AddRedPackageComponent implements OnInit {

  private moduleList = [];            //新增的红包规则的数组
  private deletebutton;               //删除的按钮

  constructor(public location: Location,public service: WebstiteService) {
  }

  ngOnInit() {
    this.deletebutton = {
      type: "delete",
      title: '删除红包规则',
    };
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

  /**
   * 添加红包规则
   */
  add() {
    this.moduleList.push({
      amount: '',
      num: '',
      level: '',
      effectiveTimeStr: '',
    });
  }

  /**
   * 删除当前的红包规则
   * @param event
   */
  delete(i) {
    let _this = this;
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
        _this.moduleList.splice(i, 1)
      }
    );
  }

  /**
   * 关闭右侧滑动页面
   */
  cancel() {
    let _this = this
    _this.location.back();
  }

  /**
   * 增加红包规则
   */
  addRedPackRules(){
    let _this = this;
    let url='/rpSetting/addRpSettingBatch';
    let json={
      rpSettingStrVOList:this.moduleList
    };
    let data={
      rpSettingBatchStr:JSON.stringify(json)
    };
    this.service.addRedPackRules(url,data);
    _this.location.back();
  }

}
