import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddFormworkService} from "./add-formwork.service";
import {AREA_LEVEL_3_JSON} from "../../../core/services/area_level_3";
import {AREA_LEVEL_1_JSON} from "../../../core/services/area_level_1";
import {CHINA_AREA} from "../../../core/services/china_area";
import {isArray} from "rxjs/util/isArray";
import {AjaxService} from "../../../core/services/ajax.service";
import {SessionService} from "../session.service";
const swal = require('sweetalert');


@Component({
  selector: 'app-add-formwork',
  templateUrl: './add-formwork.component.html',
  styleUrls: ['./add-formwork.component.scss'],
  providers:[AddFormworkService,SessionService]
})
export class AddFormworkComponent implements OnInit {
  private deletebutton;//删除运费模板按钮配置
  private updatebutton;//修改运费模板按钮配置
  public linkType:string;
  private flag = true;//声明flag用于计算方式的显示隐藏
  private moduleList = [];
  public area_model: boolean = false;
  public one: boolean = true;
  public twe: boolean = false;
  public three: boolean = false;
  public reslut: Array<any> = [];
  private cru: number = 0;
  china_area = CHINA_AREA;
  area_level1 = AREA_LEVEL_1_JSON;
  area_level2 = AREA_LEVEL_3_JSON;
  allCheckeds = [];
  data: Array<any> = [];
  checkOptionsOnes = {};
  // public reslut: string = '';
  constructor(private routeInfo:ActivatedRoute, private router:Router,private AddFormworkService:AddFormworkService,private ajax:AjaxService,private session:SessionService) { }

  ngOnInit() {
    // 初始化地区数据
    this.getallCheckeds();
    console.log(this.data);
    console.log(this.allCheckeds); // 这个可以控制显示与隐藏
    console.log(this.checkOptionsOnes);
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数

    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    this.updatebutton = {
      type:"update",
      title:'修改运费模板值',
    };
    this.deletebutton = {
      type:"delete",
      title:'删除运费模板值',
    };

  }

  /**
   * 遍历所有的地区数据（第一级，第二级的）
   * @param index
   * @param j
   * @param provices
   */
  updateAllChecked(index: number | string, j: number | string, provices: any) {
    console.log(1);
    if (this.allCheckeds[index]['allChecked']) {
      this.data[index]['provices'].forEach(item => item.checked = true);
      provices.forEach(item => {
        this.checkOptionsOnes[item.areaCode][0].forEach(items => items.checked = true);
      });
    } else {
      this.data[index]['provices'].forEach(item => item.checked = false);
      provices.forEach(item => {
        this.checkOptionsOnes[item.areaCode][0].forEach(value => value.checked = false);
      });
    }
  }


  updateAllchildChecked(index: number | string, j: number | string, code: any) {
    this.allCheckeds[index]['allChecked'] =
      this.data[index]['provices'].every(item => item.checked === true);
    console.log(this.allCheckeds[index]['allChecked']);
    // 添加运费模板时选择区域的  全选全不选
    if (this.data[index]['provices'][j]['checked']) {
      this.checkOptionsOnes[code][0].forEach(value => value.checked = true);
    } else {
      this.checkOptionsOnes[code][0].forEach(value => value.checked = false);
    }
  }

  updateSingleChecked(index: number | string, j: number | string, code: string) {
    if (this.checkOptionsOnes[code][0].every(item => item.checked === false)) {
      this.data[index]['provices'][j]['checked'] = false;
    } else if (this.checkOptionsOnes[code][0].every(item => item.checked === true)) {
      this.data[index]['provices'][j]['checked'] = true;
    } else {
      this.data[index]['provices'][j]['checked'] = false;
    }
    this.allCheckeds[index]['allChecked'] =
      this.data[index]['provices'].every(item => item.checked === true);
  }

  getCheckOptionsOnes(code: string) {
    const len = isArray(this.area_level2) ? this.area_level2.length : 0;
    for (let i = 0; i < len; i++) {
      if (this.area_level2[i]['areaCode'] === code) {
        const length = isArray(this.area_level2[i]['children']) ? this.area_level2[i]['children'].length : 0;
        const temp = [];
        this.checkOptionsOnes[this.area_level2[i]['areaCode']] = [];
        for (let j = 0; j < length; j++) {
          temp.push({
            label: this.area_level2[i]['children'][j]['areaName'],
            value: this.area_level2[i]['children'][j]['areaName'], checked: false
          });
        }
        this.checkOptionsOnes[this.area_level2[i]['areaCode']].push(temp);
        break;
      }
    }
  }

  /**
   * 已选择的区域
   * @param provices
   * @param index
   */
  getProvices(provices: Array<string>, index: string) {
    const len = isArray(this.area_level1) ? this.area_level1.length : 0;
    for (let i = 0; i < len; i++) {
      provices.forEach((item, indexs) => {
        if (item === this.area_level1[i]['areaCode']) {
          this.getCheckOptionsOnes(item);
          this.data[index]['provices']
            .push({
              label: this.area_level1[i].areaName,
              value: this.area_level1[i].areaName,
              areaCode: this.area_level1[i].areaCode,
              checked: false
            });
          if (isArray(this.allCheckeds[index]['content'])) {
            const tempObject = {};
            tempObject['childChecked'] = false;
            this.allCheckeds[index]['content'].push(tempObject);
          }
        }
      });
    }
  }
  getallCheckeds() {
    const len = isArray(this.china_area) ? this.china_area.length : 0;
    for (let i = 0; i < len; i++) {
      this.allCheckeds.push({allChecked: false, content: []});
      this.data.push({label: this.china_area[i].chinaAreaName, provices: []});
      this.getProvices(this.china_area[i].provices, i + '');
    }
  }



  /**
   *获取选择区域后的结果
   */
  getResult(): string {
    const len = isArray(this.data) ? this.data.length : 0;
    let tempResult = [];
    for (let i = 0; i < len; i++) {
      const temp = [];
      this.data[i]['provices'].forEach(item => {
        if (item.checked && !item.disabled) {
          temp.push(item.value);
        } else {
          this.checkOptionsOnes[item.areaCode][0].forEach(value => {
            if (value.checked && !value.disabled) {
              temp.push(value.value);
            }
          });
        }
      });
      tempResult = tempResult.concat(temp);
    }
    this.reslut[this.cru] = tempResult.join('_');
    this.session.setData(this.cru, this.data);
    this.session.setCheck(this.cru, this.checkOptionsOnes);
    this.close();
    return tempResult.join('_');
  }


  /**
   * 判断计量方式(按件数，重量，体积)
   */
  number(){
    this.one = true;
    this.twe = false;
    this.three = false;
  }
  weight(){
    this.one = false;
    this.twe = true;
    this.three = false;
  }
  volume(){
    this.one = false;
    this.twe = false;
    this.three = true;
  }


  /**
   * 判断选择区域时选择了几个
   * @param areaCode
   * @returns {string}
   */
  getCount(areaCode: string) {
    let count = 0;
    this.checkOptionsOnes[areaCode][0].forEach(item => {
      if (item.checked === true) {
        count ++ ;
      }
    });
    return count === 0 ? '' : '(' + count + ')';
  }

  /**
   * 关闭时区域的子集框消失
   */
  clear() {
    this.close();
  }

  close() {
    // allCheckeds[i]['content'][j]['childChecked']
    this.allCheckeds.forEach(item => {
      item['content'].forEach(value => {
        value['childChecked'] = false;
      })
    })
  }

  edit(index: number) {
    this.cru = index;
    this.close();
    if (this.reslut[this.cru]) {
      const temp = this.session.getDatas(this.reslut.length - 1);
      const temp1 = this.session.getDatas(this.cru);
      const check = this.session.getCheck(this.reslut.length - 1);
      const check1 = this.session.getCheck(this.cru);
      const len = isArray(temp) ? temp.length : 0;
      for (let i = 0; i < len; i++) {
        temp[i]['provices'].forEach((item, key) => {
          if (item.checked && !temp1[i]['provices'][key]['checked']) {
            temp1[i]['provices'][key]['checked'] = true;
            temp1[i]['provices'][key]['disabled'] = true;
          }
          check[item.areaCode][0].forEach((value, j) => {
            if (value.checked && !check1[item.areaCode][0][j]['checked']) {
              check1[item.areaCode][0][j]['checked'] = true;
              check1[item.areaCode][0][j]['disabled'] = true;
            }
          });
        });
      }
      this.data = temp1;
      this.checkOptionsOnes = check1;
    } else {
      this.allCheckeds.forEach((item) => {
        if (item.allChecked) {
          item['disabled'] = true;
        }
      });
      const len = isArray(this.data) ? this.data.length : 0;
      for (let i = 0; i < len; i++) {
        this.data[i]['provices'].forEach(item => {
          if (item.checked) {
            item['disabled'] = true;
          }
          this.checkOptionsOnes[item.areaCode][0].forEach(value => {
            if (value.checked) {
              value['disabled'] = true;
            }
          });
        });
      }

    }
  }

  show(){
    this.flag = true;//等于true时，计价方式显示出来，初始化时是显示状态
  }
  hide(){
    this.flag = false;//等于false时，计价方式隐藏
  }
  /**
   * 关闭右侧滑动页面
   */
  cancel() {
    this.router.navigate(['/main/operation/freight-template']);
  }

  /**
   * 添加运费模板值的时候table数组增加
   */
  add(){
    this.moduleList.push({reslut: '', index: this.moduleList.length + 1});
    console.log("█ this.moduleList ►►►",  this.moduleList);
  }


  /**
   * 删除运费模板值信息
   * @param event
   */
  delete(delCodeId,i) {
    let _this = this, url: string = "/expressTpl/delteStoreExpressTplVal", data: any;
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
        data = {
          id:delCodeId
        }
        console.log(data)
        _this.AddFormworkService.delCode(url, data); //删除数据
        _this.moduleList.splice(i,1)
        _this.reslut[i] = '';
      }
    );
  }

  /**
   *添加运费模板
   * @param value
   */
  addFormwork(value){
    let _this = this;
    //添加区域信息
    if(_this.linkType == 'addArticle'){
      _this.ajax.post({
        url: '/expressTpl/addStoreExpressTpl',
        data: {

        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main/website/areas'], {replaceUrl: true}); //路由跳转
            swal('添加运费模板提交成功！', '','success');
          } else {
            swal('添加运费模板提交失败！', '', 'error');
          }
        },
        error: (data) => {
          swal('添加运费模板提交失败！', '','error');
        }
      })
    }
  }
}
