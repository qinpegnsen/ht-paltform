import {Component, Input, OnInit} from "@angular/core";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');
@Component({
  selector: 'app-basic-properties',
  templateUrl: './basic-properties.component.html',
  styleUrls: ['./basic-properties.component.scss'],
})
export class BasicPropertiesComponent implements OnInit {
  @Input() selType: any; //选中的商品分类
  public addbuttons;//添加按钮
  public updatebuttons: Object;//修改按钮
  public deletebuttons: Object;//删除按钮
  public selectGoodsType:any; //选择的分类信息

  public kindList;// 分类列表
  public kindId:string;//分类id
  public data:any;//查询到的基本属性
  public showAddWindow:boolean = false;//是否显示添加弹窗
  public showUpdateWindow:boolean = false;//是否显示修改弹窗

  public name1:any;//基本属性名称
  public val1:any;//基本属性值
  constructor( public submit: SubmitService,public goods: GoodsService) { }

  ngOnInit() {

    let me = this;
    me.kindList = me.goods.getKindList(); //获取分类列表
    //按钮配置
    me.addbuttons = {
      type: "add-thc",
      title: '添加',
      text:'添加基本属性'
    };
    me.updatebuttons = {
      title: "编辑",
      type: "update"
    };
    me.deletebuttons = {
      title: "删除",
      type: "delete"
    };
  }
  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    let _this = this;
    _this.selectGoodsType = data;
    _this.kindId = data.kindId;
    _this.queryBaseEnumList();//查询基本属性
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  queryBaseEnumList(kindId?) {
    let _this = this,sel= _this.selType;
    if ((isNullOrUndefined(this.kindId) || this.kindId == "") && sel) _this.getKind(sel);
    let requestUrl = '/goodsEnum/queryBaseEnumList';
    let requestData = {
      kindId:kindId?kindId:_this.kindId,
    };
    let result=_this.submit.getData(requestUrl, requestData);
    _this.data = result;
  }

  /**
   * 对基本属性进行（拖拽）排序
   */
  updateIdx(id,idx){
    let me = this;
    let url = "/goodsEnum/updateIdx";
    let data={
      id:id,
      idx:idx,
    }
   me.submit.putRequest(url,data);
  }

  //删除
  delete(delid) {
    let me=this;
    let url = "/goodsEnum/deleteGoodsEnum";
    let data={
      id:delid
    }
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
        me.submit.delRequest(url, data); //删除数据
        me.queryBaseEnumList(); //更新
      }
    );
  }

  /*
  * 添加弹窗
  * */
  addNewData() {
    this.showAddWindow = true;
  }

  /*
  * 修改弹窗
  * */
  updateNewData(name,val) {
    this.name1=name,
    this.val1=val,
    this.showUpdateWindow = true;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getAddDataResult(data) {
    this.showAddWindow = false;
    if(data == 'success') this.queryBaseEnumList()
  }

  getUpdateResult(data) {
    this.showUpdateWindow = false;
    if(data == 'success') this.queryBaseEnumList()
  }

}
