import { Component, OnInit,AfterContentInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from '../../../core/settings/settings.service';
import {AjaxService} from "../../../core/services/ajax.service";
import { FileUploader } from 'ng2-file-upload';
import {isNullOrUndefined} from "util";
import {PatternService} from "../../../core/forms/pattern.service";
const swal = require('sweetalert');
declare var $:any;
declare var AMap:any;
const uploadUrl = "upload/basic/upload";  //图片上传路径(调取上传的接口)


@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  public flag:boolean=false;//修改经纬度按钮的显示
  private organ={}
  public uploader:FileUploader = new FileUploader({
    url: uploadUrl,
    itemAlias:"limitFile",
    queueLimit: 1
  }); //初始化上传方法
  public linkType:string;
  private uid;//声明保存获取到的暗码
  public agentCode:string;//获取代理商编码
  private staff:any = {};
  private aa;


  constructor(public settings:SettingsService, private ajax:AjaxService, private router:Router, private routeInfo:ActivatedRoute,private patterns: PatternService) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }


  ngOnInit() {
    let me = this;
    //页面完成后加载地图
    setTimeout(() => {
      //实例化地图
      let map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13,//地图显示的缩放级别
        keyboardEnable: false
      });

      // 搜索定位
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        //实例化Autocomplete
        var autoOptions = {
          city: "", //城市，默认全国
          input: "keyword"//搜索框id
        };
        let autocomplete = new AMap.Autocomplete(autoOptions); //实例化搜索组件
        //包装搜索条件
        let placeSearch = new AMap.PlaceSearch({
          city: '北京', //默认北京
          map: map
        })
        //设置收拾条件（选择时，重置搜索地址信息）
        AMap.event.addListener(autocomplete, "select", function (e) {
          placeSearch.search(e.poi.name)
        });
      })

      //设置监听，获取地图经纬度
      var clickEventListener = map.on('click', function (e) {
        me.staff.coordinateLng = e.lnglat.getLng();//经度
        me.staff.coordinateLat = e.lnglat.getLat();//纬度
      });

    }, 1);

    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
    this.agentCode = this.routeInfo.snapshot.queryParams['agentCode'];//获取代理商的编码

    /**
     * 上传文件 获取暗码
     */
    me.ajax.get({
      url: '/upload/basic/uid',
      success: (res) => {
        if (res.success) {
          me.uid = res.data;//把获取的暗码赋值给uid
          //console.log('获取的暗码成功！', _this.uid);
          //_this.outputvalue.emit(true);//提交成功后向父组件传值
        } else {
          let errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          swal(res.info, errorMsg, 'error');
        }
      },
      error: (data) => {
        //swal('获得暗码失败','','error');
      }
    });

    /**
     * 请求代理商详细数据，并显示()
     */
    if(!isNullOrUndefined(this.agentCode)) {
      this.ajax.get({
        url: '/agent/loadByAgentCode',
        async: false, //同步请求
        data: {agentCode: this.agentCode},
        success: (res) => {
          console.log("█ res ►►►",  res);

          this.staff = res.data;
          if(isNullOrUndefined(this.staff)) this.staff = {}
        },
        error: (res) => {
          console.log("post limit error");
        }
      });
    }

  }

  /**
   * 显示/隐藏地图
   * @param data
   */
  isShowMap(data?:any) {
    data.isShowMap = !data.isShowMap;
    this.aa=!this.aa;
  }
  isShowMap1(){
    this.aa=!this.aa;
  }
  /**
   * 显示/隐藏 修改经纬度的按钮
   * @param data
   */
  buttonShow(data:any) {
    data.isShowMap = !data.isShowMap;
    this.flag=true;
    console.log(this.flag)
  }

  /**
   * 关闭右侧滑动页面
   */
  cancel() {
    //this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
    this.router.navigate(['/main/agent/agentperson']);
  }

  //获取区域数据
  private getAreaData(area){
    let me = this;
    me.staff['areaCode'] = area.areaCode;
  }

  addLimitList(value) {
    let _this = this;
    //添加代理商信息
    if (_this.linkType == 'addArticle') {
      _this.ajax.post({
        url: '/agent/addAgent',
        data: {
          'agentName': value.agentName,
          'agentLevel': value.agentLevel,
          'agentAcct': value.agentAcct,
          'agentPwd': value.agentPwd,
          'leader': value.leader,
          'moblie': value.moblie,
          'idcard': value.idcard,
          /*'idcardImage1uuid': value.idcardImage1uuid,
          'idcardImage2uuid': value.idcardImage2uuid,*/
          'areaCode': value.areaCode,
          'address': value.address,
          'coordinateLng': value.coordinateLng,
          'coordinateLat': value.coordinateLat,
          'description': value.description,
          'telephone':value.telephone
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main/agent/agentperson'], {replaceUrl: true}); //路由跳转
            swal('添加代理商提交成功！', '', 'success');
            // _this.AreasComponent.queryList()//实现刷新
          } else {
            swal(res.info,);
          }
        },
        error: (data) => {
          swal('添加代理商提交失败！', 'error');
        }
      })

    /*  /!**
       * 构建form时，传入自定义参数
       * @param item
       *!/
      _this.uploader.onBuildItemForm = function(fileItem, form){
        form.append('fileuuid', _this.uid);
      };

      /!**
       * 上传成功处理
       * @param item 成功的文件列表
       * @param response 返回信息
       * @param status 状态码
       * @param headers 上传成功后服务器的返回的返回头
       *!/
      _this.uploader.onSuccessItem = function (item, response, status, headers) {
        let res = JSON.parse(response);
        if (res.success) {
          /!**
           * 上传文件成功，保存数据库
           *!/
          _this.ajax.post({
            url: '/agent/addAgent',
            async: false,
            data: {
              'agentName': value.agentName,
              'agentLevel': value.agentLevel,
              'agentAcct': value.agentAcct,
              'agentPwd': value.agentPwd,
              'leader': value.leader,
              'moblie': value.moblie,
              'idcard': value.idcard,
              'idcardImage1uuid': value.idcardImage1uuid,
              'idcardImage2uuid': value.idcardImage2uuid,
              'areaCode': value.areaCode,
              'address': value.address,
              'coordinateLng': value.coordinateLng,
              'coordinateLat': value.coordinateLat,
              'description': value.description
            },
            success: (res) => {
              if (res.success) {
                _this.router.navigate(['/main/limit'], {replaceUrl: true}); //路由跳转
                swal('文件添加提交成功！', '列表已自动更新...', 'success');
                //_this.limitComponent.refresh();
                //_this.outputvalue.emit(true);//提交成功后向父组件传值
              } else {
                swal(res.info, "上传文件成功，但保存信息失败！", 'error');
              }
            },
            error: (data) => {
              swal(res.info, "上传文件成功，但保存信息失败！", 'error');
            }
          });
        } else {
          swal('上传失败', '文件上传失败！', 'error');
        }
      };
      /!**
       * 上传失败处理
       * @param item 失败的文件列表
       * @param response 返回信息
       * @param status 状态码
       * @param headers 上传失败后服务器的返回的返回头
       *!/
      _this.uploader.onErrorItem = function (item, response, status, headers) {
        swal('上传失败', '文件上传失败！', 'error');
      };
      /!**
       * 执行上传
       *!/
      _this.uploader.uploadAll();*/
    }
    //修改代理商信息
    else if(_this.linkType == 'updataArticle'){
      _this.ajax.put({
        url: '/agent/updateAgentBasic',
        data: {
          'agentCode':_this.agentCode,
          'agentName': value.agentName,
          'agentLevel': value.agentLevel,
          'agentAcct': value.agentAcct,
          'agentPwd': value.agentPwd,
          'leader': value.leader,
          'moblie': value.moblie,
          'idcard': value.idcard,
          'telephone':value.telephone,
         /* 'idcardImage1uuid': value.idcardImage1uuid,
          'idcardImage2uuid': value.idcardImage2uuid,*/
          'areaCode': value.areaCode,
          'address': value.address,
          'coordinateLng': value.coordinateLng,
          'coordinateLat': value.coordinateLat,
          'description': value.description,
        },
        success: (res) => {
          console.log("█ value ►►►",  value);

          console.log(res)
          if (res.success) {
            _this.router.navigate(['/main/agent/agentperson'], {replaceUrl: true});   //路由跳转
            swal('修改区域信息成功！', '', 'success');
            //_this.AreasComponent.queryList()//实现刷新
          } else {
            let errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
            swal(res.info, errorMsg, 'error');
          }
        },
        error: (data) => {
          swal('修改区域信息失败！', '', 'error');
        }
      });
    }
  }
}
