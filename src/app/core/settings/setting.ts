/**
 * Created by gaojie on 2018/1/5.
 */
export class Setting {
  public static SELF_STORE = 'SZH_PLAT_SELF_STORE';
  public static SELF_STORE_NAME = '三楂红平台自营店';
  public static URLS = {
    goods: {
      chooseKind: '/main/goods/publish/step_one',//外部选择分类，如果发布商品入口在平台商品管理中，则注释此链接，解开下面三个链接
      publishEdit: '/main/goods/manage/step_two',//外部发布详情
      published: '/main/goods/publish/step_three',//外部完成发布
      // chooseKind: '/main/goods/plat/publish/step_one',//平台选择分类
      // publishEdit: '/main/goods/plat/manage/step_two',//平台发布详情
      // published: '/main/goods/plat/publish/step_three',//平台完成发布
      manage: '/main/goods/plat/manage',//平台商品管理
      storeManage: '/main/goods/store/manage',//企业商品管理
      edit: '/main/goods/plat/manage/edit',//平台修改商品
      storeEdit: '/main/goods/store/manage/edit',//企业修改商品
      detail: '/main/goods/plat/manage/detail',//平台商品详情
      storeDetail: '/main/goods/store/manage/detail',//企业商品详情
      editRe: 'edit',//相对路径，商品修改
      auditRe: 'audit',//相对路径，商品审核
      detailRe: 'detail',//相对路径，商品审核
      stepTwoRe: '../step_two',//相对路径，商品发布第二步
    }
  }
}
