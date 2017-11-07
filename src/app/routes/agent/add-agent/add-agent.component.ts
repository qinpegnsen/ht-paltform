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
  public maps:string='';//修改经纬度按钮的显示
  private organ={}
  public uploader:FileUploader = new FileUploader({
    url: uploadUrl,
    itemAlias:"limitFile",
    queueLimit: 1
  }); //初始化上传方法
  public linkType:string;
  public agentCode:string;//获取代理商编码
  private staff:any = {};
  private showUp = false;
  private placeSearch: any;
  private selectArea;


  constructor(public settings:SettingsService, private ajax:AjaxService, private router:Router, private routeInfo:ActivatedRoute,private patterns: PatternService) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }


  ngOnInit() {
    let me = this;
    //页面完成后加载地图
    me.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
    me.agentCode = this.routeInfo.snapshot.queryParams['agentCode'];//获取代理商的编码
    me.queryAgent();//请求代理商详细数据
    me.refreshMap();//修改代理商信息时刷新地图
  }

  /**
   * 地图
   */
  refreshMap(){
    setTimeout(() => {
      //实例化地图

      let map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13,//地图显示的缩放级别
        keyboardEnable: false
      }),me = this;

      AMap.service('AMap.PlaceSearch',function(){//回调函数
        //实例化PlaceSearch
        me.placeSearch= new AMap.PlaceSearch();
        //TODO: 使用pla ceSearch对象调用关键字搜索的功能
        me.placeSearch.search(me.selectArea, function(status, result) {
          let lng,lat;
          if(me.linkType == 'updataArticle'){
            lng = me.staff.coordinateLng;
            lat = me.staff.coordinateLat;
          }else{
            lat = result.poiList.pois[0].location.lat;
            lng = result.poiList.pois[0].location.lng;
          }
          map.setCenter(new AMap.LngLat(lng, lat));
        });
      })

      //设置监听，获取地图经纬度
      var clickEventListener = map.on('click', function (e) {
        me.staff.coordinateLng = e.lnglat.getLng();//经度
        me.staff.coordinateLat = e.lnglat.getLat();//纬度
        me.maps=me.staff.coordinateLng+','+me.staff.coordinateLat;
        // console.log("█ this.maps ►►►",  me.maps);
      });

      var marker = new AMap.Marker({
        map:map,
        bubble:true
      })
      if(me.linkType == 'updataArticle'){
        marker.setPosition(new AMap.LngLat(me.staff.coordinateLng,me.staff.coordinateLat));
      }

      /**
       * 点击出来标注点
       */
      map.on('click',function(e){
        marker.setPosition(e.lnglat);
      })
      AMap.plugin('AMap.Geocoder',function(){
        var drving = new AMap.Geocoder({
          map:map
        })
        drving.search([
          {keyword:'北京西站',city:'北京'}
        ]);
      })

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
    }, 1);
  }

  /**
   * 请求代理商详细数据，并显示()
   */
  queryAgent(){
    if(!isNullOrUndefined(this.agentCode)) {
      this.ajax.get({
        url: '/agent/loadByAgentCode',
        async: false, //同步请求
        data: {agentCode: this.agentCode},
        success: (res) => {
          this.staff = res.data;
          this.maps=this.staff.coordinateLat + ',' + this.staff.coordinateLng;
          // console.log("█ this.maps ►►►",  this.maps);

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
    this.showUp=!this.showUp;
  }
  isShowMap1(){
    this.showUp=!this.showUp;
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
    this.router.navigate(['/main/agent/agentperson']);
  }

  //获取区域数据
  private getAreaData(area){
    let me = this;
    me.staff['areaCode'] = area.areaCode;
    console.log("█ me.staff ►►►",  me.staff);

    me.selectArea = area.adr;
    me.refreshMap()
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
          'areaCode': value.areaCode,
          'address': value.address,
          'coordinateLngStr': this.maps,
          'description': value.description,
          'telephone':value.telephone
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main/agent/agentperson'], {replaceUrl: true}); //路由跳转
            swal('添加代理商提交成功！', '', 'success');
            // _this.AreasComponent.queryList()//实现刷新
          } else {
            swal(res.info);
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
          'areaCode': value.areaCode,
          'address': value.address,
          'coordinateLngStr': this.maps,
          'description': value.description,
        },
        success: (res) => {
          console.log(res)
          if (res.success) {
            _this.router.navigate(['/main/agent/agentperson'], {replaceUrl: true});   //路由跳转
            swal('修改区域信息成功！', '', 'success');
          } else {
            swal(res.info, '','error');
          }
        },
        error: (data) => {
          swal('修改区域信息失败！', '', 'error');
        }
      });
    }
  }
}
