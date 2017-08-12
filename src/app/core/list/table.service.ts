import {Inject, Injectable} from '@angular/core';
import {isNull, isNullOrUndefined, isString} from 'util';
import {AjaxService} from '../services/ajax.service';
declare var $: any;
var _this: any;

/**
 * datatable数据信息处理
 */
@Injectable()
export class TableService {
  public _ajax: any; //ajax

  constructor(@Inject(AjaxService) ajax: AjaxService) { //构造初始化
    this._ajax = ajax; //初始化已封装的ajax
    _this = this;
  }

  /**
   * 封装查询参数
   * @param map 查询参数
   * @returns {{name: string, value: Map<string, any>}}
   */
  public selInfos(map: Map<string, any>) {
    return {name: 'sInfo', value: map};
  }

  /**
   * 异步请求后台，获取数据的处理函数
   * @param sSource     服务器url
   * @param aoData      框架查询所携带的所有参数
   * @param fnCallback  执行返回数据
   */
  public ajaxDataList(sSource, aoData, fnCallback) {
    //封装查询参数
    let data: Map<string, any> = _this.getPageInfo(aoData, 'sInfo');
    if(isNullOrUndefined(data)) data = new Map();
    data.set('curPage', _this.getCurPage(aoData));
    data.set('pageSize', _this.getPageSize(aoData));
    data.set('sortColumns', _this.getSortColumns(aoData));
    data.set('intext', _this.getSearchKeyWord(aoData));
    let dataMap = {};  //查询参数（最终）
    data.forEach(function (val, name, map) {
      dataMap[name] = val;
    });
    //请求后台，获取数据
    _this._ajax.get({
      url: sSource,
      data: dataMap,
      success: (data) => {
        fnCallback(data);
      },
      error: (data) => {
        console.log('data', data);
      }
    });
  }

  /**
   * 获取信息，并封装成列表
   * @param tableId 列表的id
   * @param paramOrUrl 当是string型时，代码数据源地址。。。。否则为atatables的参数信息，列表按照此配置生成
   * @param searchPlaceholder 搜索框中默认提示信息
   * @param columns 数据列表的名称和对应值
   * @returns {any}
   */
  getDataTables(tableId, paramOrUrl, searchPlaceholder?, columns?) {
    /**
     * 国际化所需信息
     * @type {{sSearchPlaceholder: any; sProcessing: string; sLengthMenu: string; sZeroRecords: string; sInfo: string; sInfoEmpty: string; sInfoFiltered: string; sInfoPostFix: string; sSearch: string; sUrl: string; sEmptyTable: string; sLoadingRecords: string; sInfoThousands: string; oPaginate: {sFirst: string; sPrevious: string; sNext: string; sLast: string}; oAria: {sSortAscending: string; sSortDescending: string}}}
     */
    let language = {
      sSearchPlaceholder: searchPlaceholder,
      sProcessing: '处理中...',
      sLengthMenu: '共 _MENU_ 条',
      sZeroRecords: '没有匹配结果',
      sInfo: '第 _START_ 至 _END_ 条，共 _TOTAL_ 条',
      sInfoEmpty: '第 0 至 0 条，共 0 条',
      sInfoFiltered: '(由 _MAX_ 条过滤)',
      sInfoPostFix: '',
      sSearch: '',
      sUrl: '',
      sEmptyTable: '数据为空',
      sLoadingRecords: '加载中......',
      sInfoThousands: ',',
      oPaginate: {
        'sFirst': '首页',
        'sPrevious': '上页',
        'sNext': '下页',
        'sLast': '末页'
      },
      oAria: {
        'sSortAscending': ': 以升序排列此列',
        'sSortDescending': ': 以降序排列此列'
      }
    };
    let fnDrawCallback = function () { //动态设置列表序号
      this.api().column(0).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1;
      });
    };
    let sAjaxDataProp = 'voList'; //数据集合
    let aoColumnDefs = [//设置列的属性
      {
        bSortable: false,
        data: null,
        targets: 0
      }
    ]
    /**
     * 1、传入tableId, dataUrl, searchPlaceholder, columns，且不传入paramList参数
     * 此时，以默认布局生成数据列表，默认的配置如下
     */
    var paramList;
    if (isString(paramOrUrl)) {
      paramList = {
        // bStateSave: true,                   //状态保存，使用了翻页或者改变了每页显示数据数量，会保存在cookie中，下回访问时会显示上一次关闭页面时的内容
        processing: false,                    //加载数据时显示正在加载信息
        searching: true,                     //显示/屏蔽搜索框
        lengthChange: false,                //显示、屏蔽每页显示条数
        autoWidth: false,                   //是否自动宽度
        showRowNumber: true,                //显示列表条数信息
        serverSide: true,                   //指定从服务器端获取数据
        /**
         * 翻页样式
         * numbers 只显示数字 （1.10.8版本）
         * simple 只有上一页和下一页两个按钮
         * simple_numbers 上一页和下一页两个按钮，加上页数按钮
         * full 首页，尾页，上一页和下一页四个按钮
         * full_numbers 首页，尾页，上一页和下一页四个按钮,加上数字按钮
         * first_last_numbers 首页，尾页两个按钮,加上数字按钮
         */
        sPaginationType: 'full_numbers',
        language: language,
        fnDrawCallback: fnDrawCallback,
        pageLength: 25,                    //每页显示25条数据
        sAjaxDataProp: sAjaxDataProp,          //指定服务器返回的数据集合名
        ajaxSource: paramOrUrl,               //获取数据的url
        fnServerData: _this.ajaxDataList,
        aoColumns: columns,
        aoColumnDefs: aoColumnDefs//设置列的属性
      };
    } else {
      paramList = paramOrUrl;
      paramList.fnDrawCallback = fnDrawCallback;    //动态设置列表序号
      paramList.aoColumnDefs = aoColumnDefs         //设置列的属性,第一列为序号列
      if(!isNullOrUndefined(paramList.language) && !isNullOrUndefined(paramList.language.sSearchPlaceholder)){
        let sl = paramList.language.sSearchPlaceholder;
        paramList.language = language;                //国际化
        paramList.language.sSearchPlaceholder = sl;
      }
      paramList.sAjaxDataProp = sAjaxDataProp;      //设置接收数据源集合名为‘voList’
      paramList.fnServerData = _this.ajaxDataList; //设置查询条件及执行搜索
    }
    var table = $('#' + tableId).DataTable(paramList); //生成列表

    //单击选择数据，并改变背景色
    $('#' + tableId + ' tbody').on('click', 'tr', function () {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });

    return table;
  }

  //获取选中行数据
  getSelRow(table) {
    let sel = table.$('tr.selected');
    if (sel.length < 1) return null;
    else return table.row(sel).data();
  }

  /**
   * 获得当前页
   * @param aoData
   */
  getCurPage(aoData) {
    let iDisplayStart = Number.parseInt(this.getPageInfo(aoData, 'iDisplayStart')); //开始查询记录次序
    let pageSize = Number.parseInt(this.getPageSize(aoData));                         //分页大小
    let curPage: number = iDisplayStart / pageSize;
    return curPage + 1;
  };

  /**
   * 获得分页大小
   * @param aoData
   */
  getPageSize(aoData) {
    return this.getPageInfo(aoData, 'iDisplayLength');
  };

  /**
   * 获得搜索的关键字
   * @param aoData
   */
  getSearchKeyWord(aoData) {
    return this.getPageInfo(aoData, 'sSearch');
  };

  /**
   * 获取分页对象
   * @param aoData
   * @param name 要获取的属性名
   */
  getPageInfo(aoData, name) {
    for (let obj in aoData) {
      if (aoData[obj].name == name) {
        return aoData[obj].value;
      }
    }
  };

  /**
   * 获得排序参数
   * @param aoData
   * @returns {any}
   */
  getSortColumns(aoData) {
    var sortName = this.getSortName(aoData);
    var sortDir = this.getSortDir(aoData);
    if (!isNull(sortName)) {
      return sortName + '.' + sortDir;
    }
    return null;
  };

  /**
   * 获取点击的排序名
   * @param aoData
   */
  getSortName(aoData) {
    var sortCol = this.getPageInfo(aoData, 'iSortCol_0');
    var sortName = null;
    if (!isNull(sortCol) && Number.parseInt(sortCol) != 0) {
      sortName = this.getPageInfo(aoData, 'mDataProp_' + sortCol);
    }
    return sortName;
  };

  /**
   * 获取点击的排序方法
   * @param aoData
   */
  getSortDir(aoData) {
    var sortDir = this.getPageInfo(aoData, 'sSortDir_0');
    return sortDir;
  };
}
