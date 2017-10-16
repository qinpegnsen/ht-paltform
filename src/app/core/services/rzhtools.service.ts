import {Injectable} from "@angular/core";
import {isNull, isNullOrUndefined, isUndefined} from "util";
import {areaIdCardJSON} from "./areaIdCard";
import {AjaxService} from "./ajax.service";
import {ToasterService} from "angular2-toaster";
import {AppComponent} from "../../app.component";
import {SubmitService} from "../forms/submit.service";
import {AREA_LEVEL_2_JSON} from "./area_level_2";

@Injectable()
export class RzhtoolsService {
  private areaJson: any;
  private enumData = {};

  // Angular2框架负责注入对象
  constructor(private ajax: AjaxService, private toaster: ToasterService, public submit: SubmitService) {
    this.areaJson = areaIdCardJSON;
  }

  /**
   * 身份证信息识别
   * @param idCard
   * @returns {*}
   */
  public identify(idCard: string) {
    let isTrue = false;
    let info = '身份证号格式错误';      // 返回结果中的提示信息
    let resultMap = new Map();    // 返回map对象
    let resultMapData = new Map();  // map对象中返回数据

    if (!isNull(idCard)) {
      idCard = idCard.toString(); // 转化为字符串

      isTrue = this.verify(idCard);    // 验证身份证号的正确性

      // 15位身份证转17位身份证
      if (idCard.length == 15) {
        idCard = this.card15To17(idCard);
      }

      if (isTrue) {
        let areaCode, birthday, sex;
        areaCode = idCard.substr(0, 6);// 行政区域代码
        birthday = idCard.substr(6, 8);// 出生日期，如20170602
        birthday = birthday.substr(0, 4) + "-" + birthday.substr(4, 2) + "-" + birthday.substr(6);
        sex = Number.parseInt(idCard.substr(16, 1)) % 2 == 0 ? 0 : 1;// 性别[奇(1 男)、偶(0 女)]，取出第17位判断奇偶
        resultMapData.set("areaCode", areaCode);
        resultMapData.set("birthday", birthday);
        resultMapData.set("sex", sex);
        info = "身份证号格式正确";
      }
    }
    resultMap.set("success", isTrue);
    resultMap.set("info", info);
    resultMap.set("data", resultMapData);
    return resultMap;
  };

  /**
   * 身份证验证
   * @param idCard
   * @returns {boolean}
   */
  public verify(idCard: string) {
    if (isNull(idCard)) return false;
    idCard = idCard.toString(); // 转化为字符串

    // 第18位校验码，余数对应正确的末尾数字
    const checkCodeMap = {
      "0": "1",
      "1": "0",
      "2": "Xx",
      "3": "9",
      "4": "8",
      "5": "7",
      "6": "6",
      "7": "5",
      "8": "4",
      "9": "3",
      "10": "2"
    };

    if (idCard.length != 15 && idCard.length != 18) {
      return false;
    }
    // 验证填写区域地址是否存在
    let areaObj = this.getAreaByCode(idCard.substr(0, 6), true);
    if (isNull(areaObj)) return false;

    let isOldCard = false;
    // 15位身份证转17位身份证，因为15位身份证号没有检验码（像18位身份证号中最后一位），所以不对15位身份证号做详细校验
    if (idCard.length == 15) {
      idCard = this.card15To17(idCard);
      isOldCard = true;
    }
    // 通过前17位数字及权重，获得第18位校验码
    let checkCode = this.getCheckCodeBy17(idCard);
    // 比较正确的校验码与输入的第18位字符，且当非老身份证号码时
    if (checkCodeMap[checkCode.toString()].indexOf(idCard.substr(17, 1)) < 0 && !isOldCard) {
      console.log('false，身份证号码验证失败');
      return false;
    }
    console.log('true，身份证号码验证通过');
    return true;
  };

  /**
   * 查询出指定级别的区域对象
   * @param areaCode 区域代码
   * @param isSelectOld 是否查询老数据，默认不查询
   * @returns 行政区域对象
   */
  public getAreaByCode(areaCode: string, isSelectOld?: boolean) {
    let result = null,
      areaLevel = this.getAreaLevel(areaCode),       // 获得传入区域代码的级别
      areaLevelOne: BasicArea = null,
      areaLevelTwo: BasicArea = null,
      arealevelThree: BasicArea = null;
    // getAreaURL = areaJsonFile + '?v=' + (new Date().getTime()); // 清除缓存
    isSelectOld = isNull(isSelectOld) ? true : isSelectOld;

    // 取到省级区域对象
    if (areaLevel >= 1) {
      let shengCode = this.getAreaCodeOfSheng(areaCode);     //先取到省级区域代码
      if (!isNull(this.areaJson)) {
        for (let i in this.areaJson) {
          let condition = isSelectOld ? this.areaJson[i].areaCode == shengCode : (this.areaJson[i].areaCode == shengCode && this.areaJson[i].isNew == 1);
          if (condition) {
            areaLevelOne = this.areaJson[i];
            // console.info("级别：" + $rootScope.areaJson[i].level + "," + $rootScope.areaJson[i].fullName);
          }
        }
      }
      // 去除老数据
      if (!isSelectOld && !isNull(areaLevelOne)) {
        let newAreaArys: Array<BasicArea> = new Array;
        for (let i in areaLevelOne.children) {
          if (areaLevelOne.children[i].isNew == 1) {
            newAreaArys.push(areaLevelOne.children[i]);
          }
        }
        // console.log("█ areaLevelOne ►►► ", areaLevelOne);
        areaLevelOne.children = newAreaArys;
      }
    }
    // 取到市级区域对象
    if (areaLevel >= 2) {
      let shiCode = this.getAreaCodeOfShi(areaCode);     // 先取到市级区域代码
      if (!isNull(areaLevelOne) && !isNull(areaLevelOne.children)) {
        for (let i in areaLevelOne.children) {
          let condition = isSelectOld ? areaLevelOne.children[i].areaCode == shiCode : areaLevelOne.children[i].areaCode == shiCode && areaLevelOne.children[i].isNew == 1;
          if (condition) {
            areaLevelTwo = areaLevelOne.children[i];
            // console.info("级别：" + areaLevelOne.children[i].level + "," + areaLevelOne.children[i].fullName);
          }
        }
      }
      // 去除老数据
      if (!isSelectOld && !isNull(areaLevelTwo)) {
        let newAreaArys: Array<BasicArea> = new Array;
        for (let i in areaLevelTwo.children) {
          if (areaLevelTwo.children[i].isNew == 1) {
            newAreaArys.push(areaLevelTwo.children[i]);
          }
        }
        areaLevelTwo.children = newAreaArys;
      }
    }

    // 取到县区级区域对象
    if (areaLevel == 3) {
      if (!isNull(areaLevelTwo) && !isNull(areaLevelTwo.children)) {
        for (let i in areaLevelTwo.children) {
          let condition = isSelectOld ? areaLevelTwo.children[i].areaCode == areaCode : areaLevelTwo.children[i].areaCode == areaCode && areaLevelTwo.children[i].isNew == 1;
          if (condition) {
            arealevelThree = areaLevelTwo.children[i];
            // console.info("级别：" + areaLevelTwo.children[i].level + "," + areaLevelTwo.children[i].fullName);
          }
        }
      }
      // 去除老数据
      if (!isSelectOld && !isNull(arealevelThree)) {
        let newAreaArys: Array<BasicArea> = new Array;
        for (let i in arealevelThree.children) {
          if (arealevelThree.children[i].isNew == 1) {
            newAreaArys.push(arealevelThree.children[i]);
          }
        }
        arealevelThree.children = newAreaArys;
      }
    }
    switch (areaLevel) {
      case 1 :
        result = areaLevelOne;
        break;
      case 2 :
        result = areaLevelTwo;
        break;
      case 3 :
        result = arealevelThree;
        break;
      default :
        result = this.areaJson;
    }
    return result;
  };

  /**
   * 通过前17位数字及权重，获得第18位校验码
   * @param idCard
   * @returns {number}
   */
  private getCheckCodeBy17(idCard) {
    let idCardNumAry: Array<string> = new Array();   // 把身份证号转化为字符串数组
    for (let i = 0; i < idCard.length; i++) {
      idCardNumAry.push(idCard[i]);
    }

    const factorArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 权重值，身份证的每一位，与对应次序的数字进行相乘

    let countSum = 0;   // 前17位数字与权重值乘积的和
    let checkCode = 0;
    // 只记入前17位数字与权重值乘积的和
    for (let i = 0; i < 17; i++) {
      countSum += parseInt(idCardNumAry[i]) * factorArr[i];
    }
    // 前17位数字与对应权重值的乘积和 除以 11 的余数,即最后一位校验码
    checkCode = countSum % 11;
    return checkCode;
  }

  /**
   * 15位身份证号转17位身份证号
   * @param card15
   * @returns {string}
   */
  private card15To17 = function (card15: string) {
    return card15.substring(0, 6) + '19' + card15.substring(6);
  };

  /**
   * 通过行政区域代码 6位字符，获得省级代码
   * @param areaCode
   * @returns {string} 6位全区域代码，不足补0
   */
  private getAreaCodeOfSheng = function (areaCode) {
    return areaCode.substr(0, 2) + '0000';
  };

  /**
   * json 转 object
   * @param val
   * @returns {any}
   */
  static jsonToObject(val: string) {
    return JSON.parse(val);
  }


  /**
   * 通过行政区域代码 6位字符，获得市级代码
   * @param areaCode
   * @returns {string} 6位全区域代码，不足补0
   */
  private getAreaCodeOfShi = function (areaCode) {
    return areaCode.substr(0, 4) + '00';
  };

  /**
   * 通过行政区域代码 6位字符，获得区域级别
   * @param areaCode
   * @returns {number}
   */
  private getAreaLevel = function (areaCode) {
    let level = 0;
    if (isNullOrUndefined(areaCode)) {
      return level;
    }
    areaCode = areaCode.toString();
    if (areaCode.length != 6) return level;

    if (areaCode.substr(2, 4) == '0000') level = 1;
    else if (areaCode.substr(4, 2) == '00') level = 2;
    else level = 3;
    return level;
  }

  /**
   * 根据区域编码查询区域（2级）
   * @param code  12位区域编码
   * @returns {any}
   */
  public getAreaByTwelveBitCode(code) {
    let areaList = AREA_LEVEL_2_JSON;
    let level = this.getLevelByCode(code);
    if (level == 1) {
      for (let levelOneItem of areaList) {
        if (levelOneItem.areaCode == code) {
          return levelOneItem;
        }
      }
    } else if (level == 2) {
      let parentCode = code.substring(0, 2) + '0000000000';
      for (let area of areaList) {
        if (area.areaCode === parentCode) {
          for (let levelTwoItem of area.children) {
            if (levelTwoItem.areaCode == code) return levelTwoItem;
          }
        }
      }
    } else {
      return null
    }

  }

  /**
   * 12位的区域编码根据code查询级别
   * @param areaCode
   * @returns {number}
   */
  private getLevelByCode(areaCode) {
    let level = 0;
    if (isNullOrUndefined(areaCode)) {
      return level;
    }
    areaCode = areaCode.toString();
    if (areaCode.length != 12) return level;
    if (areaCode.substr(2, 4) == '0000') level = 1;
    else if (areaCode.substr(4, 2) == '00') level = 2;
    else if (areaCode.substr(6, 6) == '000000') level = 3;
    else level = 4;
    return level;
  }

  /**
   * 根据类型标示获取枚举信息
   * @param code 类型标示（如：1001、1002、1003....）
   * @returns {any}
   */
  public getEnumData = function (code) {
    let _this = this;
    if (!_this.enumData.hasOwnProperty(code)) {
      this.ajax.get({
        async: false,
        url: '/res/enum/' + code,
        success: function (result) {
          if (isNullOrUndefined(result)) return ''; else _this.enumData[code] = result;
        }
      });
    }
    return _this.enumData[code];
  }

  /**
   * 根据类型标示获取枚举list信息
   * code 类型标示（如：1001、1002、1003....）
   * @param code
   * @returns {Array<any>}
   */
  public getEnumDataList = function (code) {
    let list: Array<any> = new Array<any>();
    let enumInfo = this.getEnumData(code);
    for (let prop in enumInfo) {
      if (enumInfo.hasOwnProperty(prop)) {
        list.push({'key': prop, 'val': enumInfo[prop]});
      }
    }
    return list;
  }

  /**
   * 根据类型标示和key获取信息值
   * @param code （如：1001、1002、1003....）
   * @param key （如：ILLNESSCASE、TYPELESS、NURSING....）
   * @returns {any}
   */
  public getEnumDataValByKey = function (code, key) {
    let enumData = this.getEnumData(code);
    if (enumData != null && enumData !== '' && enumData !== undefined) {
      if (enumData[key] != null && enumData[key] !== '' && enumData[key] !== undefined) {
        return enumData[key];
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  /**
   * 消息提醒弹框
   * @param type 类型：error、success、info...
   * @param title 提示头信息
   * @param info 内容信息
   * @param operation 参数信息
   */
  rzhAlt = function (type: string, title: string, info?: string, operation?: Array<AltOperation>) {
    let me = this;
    if (!isNullOrUndefined(operation) && operation.length > 0) {
      for (let oper of operation) me.toaster[oper.key] = oper.val;
    }
    me.toaster.pop(type, title, info);
  }

  /**
   * 上传文章编辑器图片
   * @param file
   */
  uploadImg = function (file: any) {
    let _this = this, ret: string, data: any = new FormData();
    data.append("limitFile", file);
    _this.ajax.post({
      url: "/article/uploadArticleContentImage",
      data: data,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: (response) => {
        if (!isNullOrUndefined(response) && response.success) {
          ret = response.data;
        }
        if (!response.success) AppComponent.rzhAlt('error', response.info, file.name + '上传失败')
      },
      error: (response) => {
        AppComponent.rzhAlt('error', file.name + '上传失败', '')
      }
    });
    return ret;
  }

  /**
   * 获取下级区域列表
   * 四级区域使用
   * @param areaCode    当前级别编码
   * @param level   当前级别
   * @returns {any}
   */
  getAreaList(areaCode?: string, level?: number) {
    if (isNullOrUndefined(level)) level = 0;
    let data = {
      area_code: areaCode,
      level: level + 1
    };
    let areas = this.submit.getData('/res/area/queryAreasByCode', data);
    return areas;
  }

  /**
   * 格式化日期
   * @param date 日期对象
   * @param fmt  格式化形式
   * @returns {any}
   */
  static dataFormat = function (date: Date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  /**
   * 根据指定日期，获取其前后日期
   * @param date 指定日期
   * @param num  时间 （1代表后一天，2代表后两天，-1代表前一天......等等）
   */
  static getAroundDateByDate = function (date: Date, num: number) {
    return new Date(date.getTime() + (1000 * 60 * 60 * 24) * num);
  }

  /**
   * 根据指定时间，获取其前后日期
   * @param date 指定日期
   * @param num  时间 （1代表后一小时，2代表后两小时，-1代表前一小时......等等）
   */
  static getAroundDateByHour = function (date: Date, num: number) {
    return new Date(date.getTime() + (1000 * 60 * 60) * num);
  }

  /**
   *
   * 根据日期获取是星期几
   * @param date 日期
   * @param lan 语言（'cn':中文，'en':英语）默认英文
   * @returns {string}
   */
  static getWeek = function (date: Date, lan?) {
    let today = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    if (!isUndefined(lan) && lan == 'cn') today = new Array('周一', '周二', '周三', '周四', '周五', '周六', '周日');
    let week = today[date.getDay()-1];
    // let weeks: Array<any> = this.getEnumDataList(SettingsService.enums.week), week: string, num: number = date.getDay() + 1;
    // for (let i = 0; i < weeks.length; i++) {
    // 	if (num.toString() == weeks[i]["val"]) week = weeks[i]["key"];
    // }
    return week;
  }

  /**
   * 获取日期时间戳
   * @param string 日期：2017-08-14 或 2017-08-14 15:30:00
   * @returns {number}
   * @constructor
   */
  static dateToUnix = function (string) {
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
      parseInt(d[0], 10) || null,
      (parseInt(d[1], 10) || 1) - 1,
      parseInt(d[2], 10) || null,
      parseInt(t[0], 10) || null,
      parseInt(t[1], 10) || null,
      parseInt(t[2], 10) || null
    )).getTime();
  }

  /**
   * 获取指定年月下的周集合
   * @param year 年份，如：2017
   * @param month 月份，如:08
   * @returns {Array<string>}
   */
  getWeekListByMonth(year: string, month: string) {
    let _this = this, ret: Array<string> = new Array();
    if (year && month) {
      _this.ajax.get({
        url: "/statistical/getWeekList",
        data: {queryYear: year, queryMonth: month},
        async: false,
        success: (response) => {
          if (response.success) ret = response.data;
        }
      });
    }
    return ret;
  }


  /**
   * 审核input框的value合不合要求，只能输入整数或两位小数的限制方法
   * @param target 在HTML里的($event.targets)
   * @param type ('int':整数，其他默认两位小数)
   */
  auditInputValueForNum(target,type?:string){
    let val = target.value, reg;
    if(type == 'int') reg = val.match(/\d+/);
    else reg = val.match(/\d+(\.\d{1,2})?/);
    if (!isNull(reg)){
      target.value = reg[0];
    }else {
      target.value = val.substring(0,val.length-1)
    }
  }

}


@Injectable()
export class AltOperation { //消息提醒配置
  key: string;    // 名称
  val: string;    // 信息
}

@Injectable()
export class BasicArea {
  areaCode: string;    // 区域编号
  areaName: string;    // 区域名字
  fullName: string;    // 全名称
  isNew: number;       // 是否新区域编号
  level: number;       // 区域级别
  sheng: string;       // 省级编号，不足后补 0000
  shi: string;         // 市级编号，不足后补 00
  children: Array<BasicArea>;  // 当前区域下子集
}
