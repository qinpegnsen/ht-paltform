/**
 * Created by gaojie on 2018/1/5.
 */
export class Setting {
  public static SELF_STORE = 'SZH_PLAT_SELF_STORE';
  public static URLS = {
    goods: {
      manage: '/main/goods/plat/manage',//商品管理
      chooseKind: '/main/goods/publish/step_one',//选择分类
      publishEdit: '/main/goods/manage/step_two',//发布详情
      published: '/main/goods/publish/step_three',//完成发布
      // chooseKind: '/main/goods/plat/publish/step_one',//选择分类
      // publishEdit: '/main/goods/plat/manage/step_two',//发布详情
      // published: '/main/goods/plat/publish/step_three',//完成发布
      edit: '/main/goods/plat/manage/edit',//修改商品
      detail: '/main/goods/plat/manage/detail',//商品详情
      editRe: 'edit',//相对路径，商品修改
      auditRe: 'audit',//相对路径，商品审核
      detailRe: 'detail',//相对路径，商品审核
    }
  }
}
