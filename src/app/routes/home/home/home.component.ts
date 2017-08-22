import { Component, OnInit } from '@angular/core';
import {RzhtoolsService} from "../../../core/services/rzhtools.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private tools:RzhtoolsService) { }

    ngOnInit() {
    }

    ceshi222(){
      this.tools.rzhAlt("success","hello world!")
    }
}
