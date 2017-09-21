import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-wo-assigned',
  templateUrl: './wo-assigned.component.html',
  styleUrls: ['./wo-assigned.component.scss']
})
export class WoAssignedComponent implements OnInit {

  constructor(private parentComp: WoManageComponent) { }

  ngOnInit() {
    let me = this;
    me.parentComp.woType = 3
  }

}
