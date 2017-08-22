import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {AjaxService} from "../../../core/services/ajax.service";
import {ActivatedRoute,Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {isNull} from "util";
const swal = require('sweetalert');
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  private addButton;//新增数据按钮配置
  private controlData:Page = new Page();
  private areaCode;//声明保存上级的菜单编码
  private queryId:number;//获取添加，修改的ID
  private limitForm = {
    areaCode: ''
  }

  constructor(private ajax:AjaxService,private routeInfo:ActivatedRoute,private router:Router) {

  }

  ngOnInit() {
    let _this = this;
    _this.queryId = _this.routeInfo.snapshot.queryParams['id'];
    this.addButton = {
      type:"add",
      text:"新增区域代理",
      title:'新增区域代理',
    };
    this.controlDatas();
  }


  public controlDatas(event?:PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;

    this.ajax.get({
      url: "/agent_area/listPage",
      data: {
        curPage: activePage,
      },
      success: (data) => {
        console.log("█ data ►►►", data );
        if (!isNull(data)) {
          me.controlData = new Page(data.data);
        }
      },
      error: (data) => {
        console.log("地区获取失败");
      }
    });
  }

  /**
   * 判断代理区域是否被关闭
   */
  upFiledateState(data) {
    if (data.state == "NORMAL") {
      data.state = "CLOSE"
    } else if (data.state == "CLOSE") {
      data.state = "NORMAL"
    }
    this.ajax.get({
      url: '/agent_area/agentAreaStatus',
      data: {
        'areaCode': data.areaCode,
        'stateEnum': data.state
      },
      success: () => {
        if (data.state == "NORMAL") {
          swal('开启成功', '', 'success');
        } else if (data.state == "CLOSE") {
          swal('关闭成功', '', 'success');
        }
      },
      error: (data) => {
        swal('开启/关闭，失败', 'error');
      }
    });
  }


  addLimitList (value) {
    let _this = this;
    if (_this.queryId == 1) {
      _this.ajax.post({
        url: '/agent_area/addAgentArea',
        async: false,
        data: {
          'areaCode': _this.limitForm.areaCode,
          'remark': value.remark,
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main/limit'], {replaceUrl: true}); //路由跳转
            swal('添加页面元素提交成功！', '','success');
          } else {
            let errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
            swal(res.info, errorMsg, 'error');
          }
        },
        error: (data) => {
          swal('添加页面元素提交失败！', '','error');
        }
      })
    }
  }
}
