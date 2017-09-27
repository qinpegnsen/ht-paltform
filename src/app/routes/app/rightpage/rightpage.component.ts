import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '../../../core/settings/settings.service';
import {AjaxService} from '../../../core/services/ajax.service';
import {AppIndexOptComponent} from '../app-index-opt/app-index-opt.component';
const swal = require('sweetalert');

@Component({
  selector: 'app-rightpage',
  templateUrl: './rightpage.component.html',
  styleUrls: ['./rightpage.component.scss']
})
export class RightpageComponent implements OnInit {
  private queryId:number;//获取添加，修改的ID
  private limitForm = {
    optTypeCode: '',
    typeDesc:'',
    isEntered:''
  }
  public id:string;//获取区域编码

  constructor(public settings: SettingsService,private routeInfo:ActivatedRoute,private ajax:AjaxService,private router:Router,private AppIndexOptComponent:AppIndexOptComponent) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    let _this = this;
    _this.queryId = this.routeInfo.snapshot.queryParams['number'];
    _this.id = this.routeInfo.snapshot.queryParams['id'];
    _this.queryData();//请求详细数据，并显示
  }

  // 取消
  cancel(){
    let _this = this;
    _this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面

  }

  /**
   * 请求详细数据，并显示()
   */
  queryData(){

    if(typeof(this.id)) {

      this.ajax.get({
        url: '/phone/indexOptType/load',
        async: false, //同步请求
        data: {id: this.id},
        success: (res) => {
          this.limitForm = res;

        },
        error: (res) => {
          console.log("post limit error");
        }
      });
    }
  }


  /**
   * 添加/修改
   * @param value 必填信息
   */
  addLimitList(value){
    let _this = this;
    //添加模板类型
    if(_this.queryId == 1){
      _this.ajax.post({
        url: '/phone/indexOptType/insert',
        data: {
          'optTypeCode': value.optTypeCode,
          'optTypeName': value.optTypeName,
          'typeDesc': value.typeDesc,
          'isEntered':value.isEntered
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main//app/app-index-opt'], {replaceUrl: true}); //路由跳转
            swal('添加模板类型提交成功！', '','success');
            _this.AppIndexOptComponent.getAgentList()//实现刷新
          } else {
            swal('添加模板类型提交失败====！', 'error');
          }
        },
        error: (data) => {
          swal('添加模板类型提交失败！', '','error');
        }
      })
    }
    //修改模板类型
    else if(_this.queryId == 2) {
      _this.ajax.post({
        url: '/phone/indexOptType/update',
        data: {
          'id':_this.id,
          'optTypeCode': value.optTypeCode,
          'optTypeName': value.optTypeName,
          'typeDesc': value.typeDesc,
          'isEntered':value.isEntered
        },
        success: (res) => {
          console.log(res)
          if (res.success) {
            _this.router.navigate(['/main//app/app-index-opt'], {replaceUrl: true});   //路由跳转
            swal('修改模板类型信息成功！', '','success');
            _this.AppIndexOptComponent.getAgentList()//实现刷新
          } else {
            swal(res.info, '', 'error');
          }
        },
        error: (data) => {
          swal('修改模板类型失败！', '','error');
        }
      });
    }
  }
}
