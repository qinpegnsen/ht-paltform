import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../core/list/table.service';
import {Router} from '@angular/router';
import {AjaxService} from '../../../core/services/ajax.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-datatables',
  templateUrl:'./datatables.component.html',
  styleUrls: ['./datatables.component.scss']
})

export class DatatablesComponent implements OnInit {
  public test;
  private table;    //datatable的对象信息
  private tableId; //列表id

  constructor(private ajax: AjaxService, private tableInfo: TableService,private router:Router) { //初始化
    this.tableId = 'elderGrid'; //定义列表id
  }

  ngOnInit() {
    var _this = this;
    /*****************************第一种方式，基本属性已经固定，列表样式固定，只需传入部分必要信息即可查询 begin ******************************/
    let columns = [
      {sTitle: '序号', width: '5%'},
      {mDataProp: 'username', sTitle: '客户名'},
      {mDataProp: 'sexText', sTitle: '性别'},
      {mDataProp: 'age', sTitle: '年龄'},
      {mDataProp: 'phone', sTitle: '手机号'}
    ], searchPlaceholder = '姓名或手机号';
    this.table = _this.tableInfo.getDataTables(this.tableId, '/elder/listcondition', searchPlaceholder, columns);
    /*****************************第一种方式，基本属性已经固定，列表样式固定，只需传入部分必要信息即可查询 end ********************************/

    /*****************************第二种方式，自定义datatable参数，进行查询 begin ***********************************************************/
    // //查询参数
    // let selInfos: Map<string, any> = new Map();
    // selInfos.set('age', '40-75');
    //
    // //datatable参数配置
    // let paramList = {
    //   processing: true,                    //加载数据时显示正在加载信息
    //   searching: true,                     //显示/屏蔽搜索框
    //   lengthChange: true,                //显示、屏蔽每页显示条数
    //   autoWidth: false,                   //是否自动宽度
    //   showRowNumber: true,                //显示列表条数信息
    //   serverSide: true,                   //指定从服务器端获取数据
    //   sPaginationType: 'full_numbers',
    //   pageLength: 25,                    //每页显示25条数据
    //   sAjaxDataProp: 'voList',          //指定服务器返回的数据集合名
    //   ajaxSource: '/elder/listcondition',               //获取数据的url
    //   language: {sSearchPlaceholder: '姓名/手机/身份证'},
    //   fnServerParams: function (aoData) {
    //     aoData.push(_this.tableInfo.selInfos(selInfos));
    //   },
    //   aoColumns: [
    //     {sTitle: '序号', width: '5%'},
    //     {mDataProp: 'username', sTitle: '客户名'},
    //     {mDataProp: 'sexText', sTitle: '性别'},
    //     {mDataProp: 'age', sTitle: '年龄'},
    //     {mDataProp: 'phone', sTitle: '手机号'}
    //   ]
    // };
    // //绘制列表信息
    // _this.table = _this.tableInfo.getDataTables(this.tableId, paramList);
    /*****************************第二种方式，自定义datatable参数，进行查询 end *************************************************************/
  }

  // 登录
/*  login() {
    this.ajax.post({
      url: '/login/login',
      data: {
        'staffno': 'admin',
        'pwd': '888888'
      },
      success: (data) => {
        // this.router.navigate(['/datatables'],{ replaceUrl: true }); //路由跳转
        this.table.draw(); //重新绘制表格
        swal('登录成功！', '信息列表已自动更新...', 'success');
        console.log('data', data);
      },
      error: (data) => {
        console.log('data', data);
      }
    });
  }*/

}
