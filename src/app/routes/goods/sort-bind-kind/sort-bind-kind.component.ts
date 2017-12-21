import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SelectComponent} from "ng2-select";
import {GoodsService} from "../goods.service";
import {KindManageComponent} from "../kind-manage/kind-manage.component";
declare var $: any;

@Component({
  selector: 'app-sort-bind-kind',
  templateUrl: './sort-bind-kind.component.html',
  styleUrls: ['./sort-bind-kind.component.scss']
})
export class SortBindKindComponent implements OnInit,OnChanges ,OnDestroy{
  public showDeliverWindow: boolean = false;
  @Input('orderId') orderId: string;
  @Input('page') page: string;
  @Output() deliverGoods = new EventEmitter();
  @ViewChild('putValue') public putValue: SelectComponent;//设置默认选中的角色


  // ng2Select
  public items: any = new Array();//所有的数据
  public ids :any;//选择的品牌的id集合
  public disabled: boolean = false;//输入选择框是否禁用

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderId'] && !isNullOrUndefined(this.orderId)) {
      $('.wrapper > section').css('z-index', 200);
      this.showDeliverWindow = true;
      this.dealKindsData(this.orderId);//出来当前分类下所有的品牌，对 已经绑定的没有绑定的进行分类
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(public GoodsService:GoodsService,public KindManageComponent:KindManageComponent) {
  }

  ngOnInit() {

  }

  /**
   * 出来当前分类下品牌的数据
   */
  dealKindsData(orderId){
    let data=this.GoodsService.getBrandList(orderId),obj,tempY=new Array(),tempN=new Array();
    for(let i=0;i<data.length;i++){
      obj={
        id:data[i].id,
        text:data[i].brandName
      };
      if(data[i].binded){
        tempY.push(obj);
      }else{
        tempN.push(obj);
      }
      setTimeout(()=>{
        this.putValue.active=tempY;
      });//这个是父组件获取子组件，只有在子组件完成后才会有父组件的加载
      this.items=tempN;
    }
  }

  /**
   * 选择框增加品牌
   * @param value
   */
  public selected(value: any): void {
    this.addDate(value.text);
  }

  /**
   * 删除
   * @param value
   */
  public removed(value: any): void {
    this.items.push(value);
  }

  /**
   * 转化为字符串的id集合
   * @param value
   * @returns {string}
   */
  public itemsToString(value:Array<any> = []):string {
    return value
      .map((item:any) => {
        return item.id;
      }).join(',');
  }

  /**
   * 输入框更新触发事件
   * @param value
   */
  public refreshValue(value: any): void {
    this.ids = this.itemsToString(value);
  }

  /**
   * +号增加品牌
   */
  linkKind(value){
    let SelectIte={text:value.text,id:value.id};
    this.putValue.active.push(SelectIte);//添加到已经选择的输入框里面
    this.ids = this.itemsToString(this.putValue.active);//已经选择的品牌的id集合
    this.addDate(value.text);
  }

  /**
   * 增加数据 要从原数组里面减少
   * @param value
   */
  addDate(text){
    for(let i=0;i<this.items.length;i++){
      if(this.items[i].text==text){
        this.items.splice(i, 1);
        break;
      }
    }
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showDeliverWindow = false;
    if (isUndefined(type)) type = false;
    this.deliverGoods.emit({
      type: type,
      page: me.page
    })// 向外传值
  }

  /**
   * 确认发货
   */
  delivery() {
    let url = '/goodsKind/addRelateBrandAndKind';
    let data = {
      goodsKindId: this.orderId,
      goodsBrandIdStrings: this.ids,
    };
    let result=this.GoodsService.sortLinkKind(url,data);
    if(result.success){
      this.hideWindow(true);
    }
  }
    }
