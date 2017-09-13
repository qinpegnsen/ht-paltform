import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddFormworkService} from "./add-formwork.service";
import {AREA_LEVEL_3_JSON} from "../../../core/services/area_level_3";
import {AREA_LEVEL_1_JSON} from "../../../core/services/area_level_1";
import {CHINA_AREA} from "../../../core/services/china_area";
import {isArray} from "rxjs/util/isArray";
const swal = require('sweetalert');


@Component({
  selector: 'app-add-formwork',
  templateUrl: './add-formwork.component.html',
  styleUrls: ['./add-formwork.component.scss'],
  providers:[AddFormworkService]
})
export class AddFormworkComponent implements OnInit {
  private deletebutton;//删除运费模板按钮配置
  private updatebutton;//修改运费模板按钮配置
  public linkType:string;
  private flag = true;//声明flag用于计算方式的显示隐藏
  private moduleList = [];
  public area_model: boolean = false;
  china_area = CHINA_AREA;
  area_level1 = AREA_LEVEL_1_JSON;
  area_level2 = AREA_LEVEL_3_JSON;
  allCheckeds = [];
  data: Array<any> = [];
  checkOptionsOnes = {};
  public reslut: string = '';
  constructor(private routeInfo:ActivatedRoute, private router:Router,private AddFormworkService:AddFormworkService) { }

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

    // 全选全不选
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
  getProvices(provices: Array<string>, index: string) {
    const len = isArray(this.area_level1) ? this.area_level1.length : 0;
    for (let i = 0; i < len; i++) {
      provices.forEach((item, indexs) => {
        if (item === this.area_level1[i]['areaCode']) {
          this.getCheckOptionsOnes(item);
          this.data[index]['provices']
            .push({
              label: this.area_level1[i].areaName,
              value: this.area_level1[i].areaName, areaCode: this.area_level1[i].areaCode, checked: false
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
   *获取选择的结果
   */
  getResult(): string {
    const len = isArray(this.data) ? this.data.length : 0;
    let tempResult = [];
    for (let i = 0; i < len; i++) {
      const temp = [];
      this.data[i]['provices'].forEach(item => {
        if (item.checked) {
          temp.push(item.value);
        } else {
          this.checkOptionsOnes[item.areaCode][0].forEach(value => {
            if (value.checked) {
              temp.push(value.value);
            }
          });
        }
      });
      tempResult = tempResult.concat(temp);
    }
    this.moduleList[0].reslut = tempResult.join('_');
    console.log(tempResult.join('_'));
    this.reslut = tempResult.join('_');
    return tempResult.join('_');
  }

  clear() {

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
    //this.moduleList.push('1')
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
      }
    );
  }
}
