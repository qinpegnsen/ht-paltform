import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../../core/settings/settings.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {KindManageComponent} from "../kind-manage/kind-manage.component";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {AppComponent} from "../../../app.component";
import {FileUploader} from "ng2-file-upload";
import {GetUidService} from "../../../core/services/get-uid.service";
const swal = require('sweetalert');

@Component({
  selector: 'app-add-kind',
  templateUrl: './add-kind.component.html',
  styleUrls: ['./add-kind.component.scss'],
  providers: [KindManageComponent, SubmitService
  ]
})
export class AddKindComponent implements OnInit {
  private kindInfo = {};
  private path;// 当前路由
  private pageTitle;// 右弹窗页面标题
  private editKind: boolean = false;
  private tip = {
    commisRate: '请输入小数形式，0 <= 佣金比例 < 1',
    sort: '0-99，默认0',
    keywords: '多个关键词请用逗号隔开'
  }
  private upKindImg: boolean = false;
  private uuid: string;
  private fileName: string = '选择图片';// 文件名
  private myImg;// 我的图片，展示图片
  public uploader: FileUploader = new FileUploader({
    url: '/goodsKind/uploadGoodsKindIcon',
    itemAlias: "goodsKindIcon"
  }); //初始化上传方法

  constructor(public settings: SettingsService, private route: ActivatedRoute,private router: Router,
              private parentComp: KindManageComponent, private getUid: GetUidService,
              private submit: SubmitService) {
    this.settings.showRightPage("28%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    let me = this;
    this.kindInfo['state'] = 'SHOW';
    this.kindInfo['level'] = '1';

    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      //console.log("█ this.path ►►►", this.path);
      switch (me.path) {
        //新增分类
        case "addKind":
          //console.log("█ \"新增分类\" ►►►", "新增分类");
          me.pageTitle = "新增分类";
          me.editKind = true;
          this.uuid = this.getUid.getUid();
          let param = this.route.snapshot.queryParams;
          if (!isNullOrUndefined(param.pid)) this.kindInfo['kindParentId'] = param.pid;
          if (!isNullOrUndefined(param.pname)) this.kindInfo['parentKindName'] = param.pname;
          if (!isNullOrUndefined(param.level)) this.kindInfo['level'] = param.level;
          break;

        //修改分类
        case "upKind":
          //console.log("█ \"修改分类\" ►►►", "修改分类");
          me.pageTitle = "修改分类";
          me.editKind = true;
          me.kindInfo = this.getKindInfo();// 获取分类信息
          break;

        //修改分类
        case "upKindImg":
          //console.log("█ \"修改分类图片\" ►►►", "修改分类图片");
          me.pageTitle = "修改分类图片";
          me.upKindImg = true;
          this.uuid = this.getUid.getUid();
          break;
      }
    });
  }

  /**
   * 转到上传图片页面
   * @param id
   */
  toUpKindImg(id){
    this.settings.closeRightPage(); //关闭右侧滑动页面
    this.router.navigate(['/main/goods/kind-manage/upKindImg', id], { replaceUrl: true });
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener($event) {
    let that = this;
    let image: any = new Image();
    let file: File = $event.target.files[0];
    that.fileName = file.name;
    let myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.myImg = image.src;
    };
    myReader.readAsDataURL(file);
  }


  /**
   * 获取分类信息
   * @returns {any}
   */
  private getKindInfo() {
    let url = '/goodsKind/loadGoodsKindById';
    let data = {id: this.submit.getParams('kindId')};
    return this.submit.getData(url, data);
  }


  //提交表单
  private addKindForm() {
    let me = this;
    let submitUrl, submitData;
    submitData = me.kindInfo;
    if(me.uuid) submitData.kindIcon = me.uuid;
    switch (me.path) {
      //新增分类
      case "addKind":
        submitUrl = '/goodsKind/addGoodsKind';
        me.uploader.onBuildItemForm = function (fileItem, form) {
          form.append('uuid', me.uuid);
        };
        me.uploader.onSuccessItem = function (item, response, status, headers) {
          let res = JSON.parse(response);
          if (res.success) {
            me.submit.postRequest(submitUrl, submitData, true);
          } else {
            AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
          }
        }
        /**
         * 上传失败处理
         * @param item 失败的文件列表
         * @param response 返回信息
         * @param status 状态码
         * @param headers 上传失败后服务器的返回的返回头
         */
        me.uploader.onErrorItem = function (item, response, status, headers) {
          AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
        };
        /**
         * 执行上传
         */
        me.uploader.uploadAll();
        break;
      //修改分类
      case "upKind":
        submitUrl = '/goodsKind/updateGoodsKind';
        me.submit.putRequest(submitUrl, submitData, true);// 所有put提交用的都是SubmitService里的putRequest方法,true表示需要返回上级页面
        break;
      case "upKindImg":
        submitUrl = '/goodsKind/updateGoodsKindIcon';
        submitData = {
          kindId: this.submit.getParams('kindId'),
          uuid: me.uuid
        };
        me.uploader.onBuildItemForm = function (fileItem, form) {
          form.append('uuid', me.uuid);
        };
        me.uploader.onSuccessItem = function (item, response, status, headers) {
          let res = JSON.parse(response);
          if (res.success) {
            console.log("█ submitData ►►►",  submitData);
            me.submit.putRequest(submitUrl, submitData, true);
          } else {
            AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
          }
        }
        /**
         * 上传失败处理
         * @param item 失败的文件列表
         * @param response 返回信息
         * @param status 状态码
         * @param headers 上传失败后服务器的返回的返回头
         */
        me.uploader.onErrorItem = function (item, response, status, headers) {
          AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
        };
        /**
         * 执行上传
         */
        me.uploader.uploadAll();
    }
    me.parentComp.queryDatas(1, 0);// 刷新父页面数据
  }

  // 取消
  private cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

}
