import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-wo-assign',
  templateUrl: './wo-assign.component.html',
  styleUrls: ['./wo-assign.component.scss']
})
export class WoAssignComponent implements OnInit {

  constructor(private parentComp: WoManageComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.woType = 2
  }

}
