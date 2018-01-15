import {Component, OnInit} from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {isNullOrUndefined} from "util";
import {ActivitiesService} from "../activities.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
const swal = require('sweetalert');
declare var $: any;

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  public switch: boolean ;                  //红包开关
  public redPacketRules: any;                //新增红包规则的按钮
  public redPackData: any;                   //红包规则列表的数据
  public isUse: string = 'Y';                  //红包是否启用
  public type: string = '';                    //列表的在状态是生效还是未生效
  public showList: boolean = true;          //是否显示列表页
  public rpSwitchStare: string;               //红包开关当前的状态
  public rpPondReset: any;                    //红包奖池余额和剩余天数的信息

  constructor(private submit: SubmitService,
              public activitiesService: ActivitiesService,
              public router: Router,
              public location: Location,) {
  }

  ngOnInit() {
    this.redPacketRules = {
      title: "设置规则",
      text: "设置规则",
      type: "add-thc"
    };
    this.qeuryAll(this.isUse, 1);
    this.queryRpSwitchState();//查询红包开关的状态

  }

  /**
   * 子组件加载时
   * @param event
   */
  activate() {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate() {
    this.showList = true;
    this.qeuryAll('N', 1);
  }

  /**
   * 红包开关是否开启
   */
  isOpen(rpSwitchStare) {
    let that = this;
    that.quryRestBalanceAnddays();//查询红包奖池剩余的余额和使用天数
    setTimeout(()=>{
      that.switchControll(rpSwitchStare);
    });//事件触发的时候不让他它动，只有在确认后才动
    swal({
      title: rpSwitchStare == 'Y' ? '您确认要关闭红包抽奖开关吗？' : '您确认要开启红包抽奖开关吗？',
      text: rpSwitchStare == 'Y' ? '关闭红包抽奖开关后将无法正常使用红包抽奖功能！' : '奖池余额：' + that.rpPondReset.balance + ' 元' + '\n' + '可使用剩余天数：' + that.rpPondReset.in + ' 天',
      type: rpSwitchStare == 'N' ? 'success' : 'info',
      showCancelButton: true,
      cancelButtonText: '取消',
      closeOnConfirm: false,
      confirmButtonText: "确认",
      confirmButtonColor: "#ec6c62"
    }, function (isConfirm) {
      if (isConfirm) {
        if (that.rpSwitchStare == 'N') {
          let url = '/redSchedulingAudit/updateRpDrawOpen';
          let data = {
            state: 'Y'
          };
          that.activitiesService.updateRpSwitchState(url, data);
          swal.close(); //关闭弹框
          that.queryRpSwitchState();
        } else {
          that.closeRpSwitch()
        }
      } else {
        that.switchControll(rpSwitchStare);
      }
    });
  }

  /**
   * 根据状态控制红包按钮的开关
   * @param rpSwitchStare
   */
  switchControll(rpSwitchStare){
    if(rpSwitchStare == 'N') {
      this.switch = false;
    } else {
      this.switch = true;
    }
  }

  /**
   * 关闭红包抽奖开关
   * @param rpSwitchStare
   */
  closeRpSwitch() {
    let that = this;
    swal({
      title: '请再次进行确认！',
      text: '关闭红包抽奖开关后将无法正常使用红包抽奖功能！',
      type: "info",
      showCancelButton: true,
      cancelButtonText: '取消',
      closeOnConfirm: false,
      confirmButtonText: "确认",
      confirmButtonColor: "#ec6c62"
    }, function (isConfirm) {
      if (isConfirm) {
        let url = '/redSchedulingAudit/updateRpDrawClose';
        let data = {
          state: 'N'
        };
        that.activitiesService.updateRpSwitchState(url, data);
        swal.close(); //关闭弹框
        that.queryRpSwitchState();
      }
    });
  }

  /**
   * 红包规则列表
   */
  qeuryAll(state, curPage, event?: PageEvent) {
    this.isUse = state;
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    ;

    let url = "/rpSetting/queryRpSettingAdmin";
    let data = {
      curPage: activePage,
      pageSize: 10,
      isUsed: '',
    };
    if (isNullOrUndefined(state)) {//分页
      data.isUsed = this.isUse;
    } else {//导航
      data.isUsed = state;
    }
    ;
    let result = this.submit.getData(url, data);
    me.redPackData = new Page(result);
  }

  /**
   * 查询红包按钮当前的状态
   */
  queryRpSwitchState() {
    let url = '/redSchedulingAudit/loadRpDrawState';
    let data = {};
    this.rpSwitchStare = this.activitiesService.RpSwitchState(url, data);
    if(this.rpSwitchStare == 'N') {
      this.switch = false;
    } else {
      this.switch = true;
    }
  }

  /**
   * 查询红包奖池余额和剩余天数的信息
   */
  quryRestBalanceAnddays() {
    let url = '/redSchedulingAudit/residueBalanceUseDays';
    let data = {};
    this.rpPondReset = this.activitiesService.restBalanceAnddays(url, data);
  }
}
