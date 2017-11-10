import { Injectable } from '@angular/core';
import {isNull} from "util";
import {AppComponent} from "../../../app.component";
import {AjaxService} from "../../../core/services/ajax.service";

@Injectable()
export class MeasureService {

  constructor(public ajax: AjaxService) { }


}
