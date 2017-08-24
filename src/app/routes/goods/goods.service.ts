import {Injectable} from "@angular/core";
import {AjaxService} from "../../core/services/ajax.service";
import {SubmitService} from "../../core/forms/submit.service";
const swal = require('sweetalert');

@Injectable()
export class GoodsService {

  constructor(private ajax: AjaxService, private submit: SubmitService) { }



}
