import {Component, OnInit} from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../core/forms/submit.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-app-set',
  templateUrl: './app-set.component.html',
  styleUrls: ['./app-set.component.scss']
})
export class AppSetComponent implements OnInit {
  public items;
  private moduleList = [];
  private contentList = [];
  private item;
  private curItem;
  private flag = [];
  private isShowContent=false;
  public optType: Array<any> = new Array();
  public isEntered: Array<any> = new Array();
  public typeDesc: Array<any> = new Array();
  private optTypeList: any;

  constructor(private submit: SubmitService, private routeInfo: ActivatedRoute) {
  }

  ngOnInit() {
    let _this = this;
    _this.queryDatas(_this.item);
    _this.queryData();
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = '/phone/indexTpl/list';
    let requestData = {};
    _this.items = _this.submit.getData(requestUrl, requestData);
  }

  /**
   *数组添加中心模块
   * @param item
   */
  public addTpl(item) {
    this.isShowContent=false;
    this.moduleList.push({reslut:item.tplCheckedImg, index: this.moduleList.length + 1, data: item});

  }

  /**
   * 点击模板获取操作提示小信息p
   * @param item
   */
  public addTplCont(item) {
    this.isShowContent=true;
    let _this = this;
    _this.curItem = item;
    this.contentList.splice(0,this.contentList.length);
    for(let i=0;i<item.tplImgCount;i++){
      this.contentList.push(i);
    }

  }

  /**
   * 上传图片时鼠标滑过显示遮罩层
   */
  showMask1(i){
    this.flag[i]=true;
  }

  /**
   * 上传图片时鼠标离开时遮罩层消失
   */
  hideMask1(i){
    this.flag[i]=false;
  }

  /**
   * 获取点击下拉框是当前的模板类型和模板类型小提示
   * @param i
   */
  public showDesc(i){
    let _this = this;
    _this.isEntered[i]= _this.optType[i].isEntered;
    _this.typeDesc[i]= _this.optType[i].typeDesc;
  }

  /**
   * 点击模板获取操作类型
   */
  queryData() {
    let _this = this;
    let requestUrl = '/phone/indexOptType/list';
    let requestData = {};
    _this.optTypeList = _this.submit.getData(requestUrl, requestData);
  }
}
