import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    $('body').css('overflow', 'auto');
    $('.wrapper > section').css('z-index', 114);
  }

  public showWindow: boolean = false;
  private data: Array<any> = new Array();
  public searchText: string = '';
  public checkedItem: Array<any> = new Array();

  @Input('data') nativeData: Array<any> = new Array();
  @Input('width') width: number;    //设置宽度
  @Input('maxHeight') maxHeight: number;  //设置结果显示区的最大高，溢出则显示滚动条
  @Input('idKey') idKey: string = 'id';    //指定编码字段的key
  @Input('textKey') textKey: string = 'text';    //设置显示文本的字段的key
  @Input('placeholder') placeholder: string = '';    //默认显示文本
  @Input('defaultId') defaultId: string = '';    //设置选中想的id（或其他）
  @Input('multiple') multiple: boolean = false;    //设置多选
  @Output() selected = new EventEmitter();   //向外输出选中的结果

  constructor() {
  }

  ngOnInit() {
    let me = this;
    me.setDeafultVal();//默认选项
  }

  /**
   * 找到与搜索条件匹配的项
   */
  matchResult(): void {
    let me = this;
    if (me.searchText) {
      me.data = me.data.filter(val => {
        return val[me.textKey].indexOf(me.searchText) >= 0;
      })
    } else {
      me.data = me.nativeData;
    }
  }

  /**
   * 设置默认选项
   */
  setDeafultVal(): void {
    let me = this;
    me.data = me.nativeData.map(item => {
      if (!me.multiple) {
        if (me.checkedItem && me.checkedItem[0]) {
          if (item[me.idKey] === me.checkedItem[0][me.idKey]) item.selected = true;
          else item.selected = false;
        } else if (me.defaultId) {
          if (item[me.idKey] === me.defaultId) item.selected = true, me.checkedItem[0] = item;
          else item.selected = false;
        }
      } else {

      }
      return item;
    })
  }

  showSearchBox(): void {
    this.showWindow = true;
    this.data = this.nativeData;
    this.setStyle();  //设置样式
    this.setDeafultVal();
  }

  hideSearchBox(): void {
    this.showWindow = false;
    $('body').css('overflow', 'auto');
    $('.wrapper > section').css('z-index', 114);
  }

  /**
   * 向外传值，结果是一个对象，包含编码和值
   * @param res（eg：{id: 12345, text: '心心相印'}）
   */
  emitResult(res: any) {
    if (!this.multiple) {
      this.checkedItem[0] = res;
      this.selected.emit(res)// 向外传值，结果是一个对象，包含编码和值
      this.hideSearchBox();
    } else this.checkedItem.push(res);
  }

  /**
   * 设置样式
   */
  setStyle() {
    let me = this;
    setTimeout(_ => {
      $('body').css('overflow', 'hidden');
      $('.wrapper > section').css('z-index', 200);
      if (me.width) $('.search-body').css({
        'width': me.width,
        'margin-left': -me.width / 2
      });
      if (me.maxHeight) $('.search-result').css('max-height', me.maxHeight);
      $('.search-input input').focus();
    })
  }

}
