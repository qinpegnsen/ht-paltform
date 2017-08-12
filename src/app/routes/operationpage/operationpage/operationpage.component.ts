import {Component, OnInit} from "@angular/core";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";

@Component({
  selector: 'app-operationpage',
  templateUrl: './operationpage.component.html',
  styleUrls: ['./operationpage.component.scss']
})
export class OperationpageComponent implements OnInit {
  public menu_info:Array<any>; //枚举信息
  public menu_info_json: string; //枚举信息 json
  public menu_info_val:string; //枚举信息值

  constructor(private rzhtools: RzhtoolsService) {
    this.menu_info = rzhtools.getEnumDataList("1003"); //获取信息list
    this.menu_info_json = JSON.stringify(rzhtools.getEnumData("1003")); //获取信息 map
    this.menu_info_val = rzhtools.getEnumDataValByKey("1003","ILLNESSCASE"); //获取信息值
  }

  ngOnInit() {
  }

}
