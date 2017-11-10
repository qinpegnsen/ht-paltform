import {Injectable} from "@angular/core";
import {SubmitService} from "../../core/forms/submit.service";

@Injectable()
export class AfterService {

  constructor(public submit: SubmitService) {
  }

  /**
   * 根据售后编号查询物流信息
   * @param afterNo
   */
  public getOrderLogisticsData(afterNo) {
    let url = '/after/loadAfterTail';
    let data = {afterNo: afterNo};
    return this.submit.getData(url, data);
  }

  /**
   * 根据售后编码查询详情
   * @param requestData
   * @returns {any}
   */
  public loadReqByAfterNo(requestData) {
    let url = '/after/loadReqByAfterNo';
    return this.submit.getData(url, requestData);
  }

  /**
   * 根据售后编号查询售后处理信息
   * @param requestData
   * @returns {any}
   */
  public loadAfterTailList(requestData) {
    let url = '/after/loadAfterTailList';
    return this.submit.getData(url, requestData);
  }

  /**
   * 根据工单编码查询详情
   * @param requestData
   * @returns {any}
   */
  public loadReqByWono(requestData) {
    let url = '/after/loadReqByWono';
    return this.submit.getData(url, requestData);
  }
}
