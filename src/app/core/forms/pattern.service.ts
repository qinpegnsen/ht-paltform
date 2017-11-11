import {Injectable} from '@angular/core';

/**
 * 用来定义表单验证的正则表达式
 */
@Injectable()
export class PatternService {
  public num: string; //数字
  public letter: string; //字母
  public phone: string; //手机号
  public idcard: string; //身份证
  public telephone: string; //固话
  public buno: string; //营业执照
  public backcard: string; //银行卡
  public chinese: string; //中文
  public tel:string;//手机号和固话
  public decimals: string;  // 0-1小数
  public doubleDigit: string; // 两位为整数（0-99）
  public _URL: string; //网址
  public twodecimal:string;//两位小数
  public positive:string;
  public str:string;//除了文字
  public tplCode:string;//只能输入英文和数字的(用于添加APP首页模板的模板编码)
  public integer:string;//正整数
  public threedecimal :string;//三位小数
  public express:string;//快递单号，有的是数字和字母的组合 如圆通快速

  constructor() {
    this.num = '^[0-9]*$'; //数字正则
    this.letter = '^[A-Za-z]*$'; //字母正则
    this.phone = '^1[0-9]{10}$'; //手机号正则
    this.idcard = '^(^[1-9][0-9]{7}((0[0-9])|(1[0-2]))(([0|1|2][0-9])|3[0-1])[0-9]{3}$)|(^[1-9][0-9]{5}[1-9][0-9]{3}((0[0-9])|(1[0-2]))(([0|1|2][0-9])|3[0-1])(([0-9]{4})|[0-9]{3}[Xx])$)$'; //身份证正则
    this.telephone = '^((^[0-9]{3,4}-[0-9]{7,8}$)|(^[0-9]{7,8}$))$'; //固话正则（支持带区号和不带区号）
    this.buno = '^(([a-zA-Z0-9]{8}-[a-zA-Z0-9])|([a-zA-Z0-9]{18})|([a-zA-Z0-9]{15}))$'; //营业执照正则（三网合一）
    this.backcard = '^([0-9]{16}|[0-9]{19})$'; //银行卡正则（三网合一）
    this.chinese = '^[\u4e00-\u9fa5]{0,}$'; //中文正则（三网合一）
    this.tel = '(^1[0-9]{10}$)|(^((^[0-9]{3,4}-[0-9]{7,8}$)|(^[0-9]{7,8}$))$)';//手机号和固话同时验证
    this._URL = '^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$'; //网址
    this.decimals = '^(0\.[0-9]*[1-9]$)|^0$';　　//0-1小数，包含0,不包含1
    this.doubleDigit = '^[0-9]{1,2}$'; // 两位为整数（0-99）
    this.twodecimal='^[0-9]+(.[0-9]{1,2})?$';//两位小数
    this.positive = '^[0-9]+$'; // 整数
    this.str = '[^\u4e00-\u9fa5]+'; //除中文的任何数字包括字符
    this.tplCode = '^[A-Za-z0-9]+$'; //只能输入英文和数字的(用于添加APP首页模板的模板编码)
    this.integer = '^[0-9]*[1-9][0-9]*$'; //只能正整数
    this.threedecimal = '^[0-9]+(.[0-9]{1,3})?$'; //只能正整数
    this.express = '^[A-Za-z0-9]+$';　　//由数字和26个英文字母组成的字符串

  }

}
