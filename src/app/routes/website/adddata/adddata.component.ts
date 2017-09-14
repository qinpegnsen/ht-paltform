import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../core/settings/settings.service";
import {AdddataService} from "./adddata.service";
import {DataDictionaryComponent} from "../data-dictionary/data-dictionary.component";
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {MeasureComponent} from "../measure/measure.component";
import {cli} from "webdriver-manager/built/lib/webdriver";

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.scss'],
  providers: [AdddataService]
})
export class AdddataComponent implements OnInit {
  private adddata = {name: '', remark: '', code: '', isUniqueVal: ''};
  private adddatas = {sort: '', unitName: ''};
  public updataData: any;
  public updataDataa: any;
  public addchildData: any;
  private isName: boolean;
  public linkType: string;
  public id: number;
  public isUniqueVal = 'N';
  public acParentId: number;
  public info: string;
  public code: number;
  public typeCode: string; //key编码
  private remark: string;
  private keyName: string;
  private keys: string;

  constructor(public settings: SettingsService, private router: Router, private adddataService: AdddataService,
              private routeInfo: ActivatedRoute, private dataDictionaryComponent: DataDictionaryComponent,
              private sub: SubmitService, private submitt: SubmitService, private measureComponent: MeasureComponent,) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    //路由中获取对应参数
    let _this = this;
    _this.linkType = _this.routeInfo.snapshot.queryParams['linkType'];
    _this.acParentId = _this.routeInfo.snapshot.queryParams['acParentId'];
    _this.code = _this.routeInfo.snapshot.queryParams['code'];
    _this.keyName = _this.routeInfo.snapshot.queryParams['key'];
    _this.keys = _this.routeInfo.snapshot.queryParams['keys'];
    _this.typeCode = _this.routeInfo.snapshot.queryParams['typeCode'];
    _this.id = _this.routeInfo.snapshot.queryParams['id'];
    if (_this.linkType == "updateSort") {//数据字典--若为修改操作,获取信息
      if (isNullOrUndefined(_this.typeCode)) _this.updataData = _this.sub.getData("/datadict/loadDatadictType", {code: _this.code}); //获取数据字典key
      else _this.updataData = _this.sub.getData("/datadict/loadDatadictByCode", {code: _this.code}); //获取数据字典val
      if (_this.updataData.name) _this.isName = true; else _this.isName = false;
    }
    ;
    if (_this.linkType == "updateCount") {//计量单位--若为修改操作,获取信息
      _this.updataDataa = _this.sub.getData("/goodsUnit/loadById", {id: _this.id}); //获取数据字典key
      console.log(_this.updataDataa)

    }
  }

  // 取消
  cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  //数据字典--提交
  submit(obj) {
    if (this.linkType == 'addChildSort') {//添加数据字典val
      let url = '/datadict/addDatadict';
      let data = {
        typeCode: this.code,
        info: obj.info,
        remark: obj.remark
      }
      let result= this.adddataService.addClass(url, data);
      console.log("█ result ►►►",  result);
      if(result){
        this.dataDictionaryComponent.queryDatas()
      }else{
        return;
      }

    } else if (this.linkType == 'updateSort') {//修改数据字典key
      let url: string = '/datadict/updateDatadictType', data: any;
      if (!isNullOrUndefined(obj.name)) {
        data = { //参数
          code: this.code,
          name: obj.name,
          remark: obj.remark,
        }
      } else if (!isNullOrUndefined(obj.info)) { //修改数据字典val
        url = '/datadict/updateDatadict'; //更新方法路径
        data = { //参数
          typeCode: this.typeCode,
          code: this.code,
          info: obj.info,
          remark: obj.remark,
        }
      }
      this.adddataService.updateClass(url, data);
    } else {
      this.adddataService.getaddData(obj)//添加数据字典key
    }
    if (isNullOrUndefined(this.typeCode)) this.dataDictionaryComponent.queryDatas(); //第一层，更新第一层数据
    else this.dataDictionaryComponent.queryChildSortList(this.dataDictionaryComponent.childMenuCode, this.dataDictionaryComponent.childMenuName, true);//第2层，更新第2层数据
    this.settings.closeRightPageAndRouteBack();
  }

//计量单位--提交
  submita(res) {
    if (this.linkType == 'addCount') {
      let url = '/goodsUnit/addGoodsUnit';//计量单位添加
      let data = {
        sort: res.sort,
        unitName: res.unitName
      }
      this.submitt.postRequest(url, data, true);
      this.measureComponent.qeuryAllService();
    }
    else if (this.linkType == 'updateCount') {
      let url = '/goodsUnit/updateGoodsUnit';//计量单位修改
      let data = {
        id: this.id,
        sort: res.sort,
        unitName: res.unitName
      }
      this.submitt.putRequest(url, data,true);
      this.measureComponent.qeuryAllService();
    }
  }
}
