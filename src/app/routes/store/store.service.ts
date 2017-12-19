import {Injectable} from '@angular/core';
import {SubmitService} from "../../core/forms/submit.service";
import {isUndefined} from "util";

@Injectable()
export class StoreService {

  constructor(public submitService: SubmitService) {
  }


  /**
   * 获取企业信息
   */
  public getEpInfo(epCode: string) {
    if (!isUndefined(epCode)) {
      let url = '/enterprise/load', data = {epCode: epCode};
      let epInfo = this.submitService.getData(url, data);
      return epInfo;
    }
  }

  /**
   * 获取店铺信息
   */
  public getShopInfo(storeCode: string) {
    if (!isUndefined(storeCode)) {
      let url = '/stores/loadByStoreCode';
      let data = {storeCode: storeCode};
      return this.submitService.getData(url, data)
    }
  }

  /**
   * 获取企业入驻审核记录
   */
  public getEpAuditRecord(epCode: string) {
    if (!isUndefined(epCode)) {
      let url = '/enterpriseAuditRec/queryAuditRecListByEpCode', data = {epCode: epCode};
      let recordInfo = this.submitService.getData(url, data);
      return recordInfo;
    }
  }

  /**
   * 获取店铺审核记录
   */
  public getShopAuditRecord(storeCode: string) {
    if (!isUndefined(storeCode)) {
      let url = '/storeAuditRec/queryAuditRecListByStoreCode', data = {storeCode: storeCode};
      let recordInfo = this.submitService.getData(url, data);
      return recordInfo;
    }
  }
}
