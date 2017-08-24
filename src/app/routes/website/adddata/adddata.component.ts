import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../core/settings/settings.service";
import {AdddataService} from "./adddata.service";
import {DataDictionaryComponent} from "../data-dictionary/data-dictionary.component";
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.scss'],
  providers: [AdddataService]
})
export class AdddataComponent implements OnInit {
  private adddata = {name: '', remark: ''};
  public updataData: any;
  public addchildData:any;
  public linkType: string;
  public acParentId: number;
  public info: string;
  public code: number;
  public typeCode: string; //key编码
  private remark: string;
  private keyName: string;
  private keys: string;
  constructor(public settings: SettingsService, private router: Router, private adddataService: AdddataService,
              private routeInfo: ActivatedRoute, private dataDictionaryComponent: DataDictionaryComponent, private sub: SubmitService) {
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
    if (_this.linkType == "updateSort") {//若为修改操作,获取信息
      if (isNullOrUndefined(_this.typeCode)) _this.updataData = _this.sub.getData("/datadict/loadDatadictType", {code: _this.code}); //获取数据字典key
      else _this.updataData = _this.sub.getData("/datadict/loadDatadictByCode", {code: _this.code}); //获取数据字典val
    }
  }

  // 取消
  cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  //提交
  submit(obj) {
    if (this.linkType == 'addChildSort') {
      let url = '/datadict/addDatadict';
      let data = {
        typeCode: this.code,
        info: obj.info,
        remark: obj.remark
      }
      this.adddataService.addClass(url, data);
    } else if (this.linkType == 'updateSort') {
      if (!isNullOrUndefined(obj)) { //修改数据字典key
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
      }

    } else {
      var data = this.adddata
      this.adddataService.getaddData(data)
    }
    if (isNullOrUndefined(this.typeCode)) this.dataDictionaryComponent.queryDatas(); //第一层，更新第一层数据
    else this.dataDictionaryComponent.queryChildSortList(this.dataDictionaryComponent.childMenuCode, this.dataDictionaryComponent.childMenuName, true);//第2层，更新第2层数据
    this.settings.closeRightPageAndRouteBack();
  }
}
