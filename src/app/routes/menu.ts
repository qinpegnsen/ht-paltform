/**
 * 系统管理
 * @type {{text: string; link: string; icon: string; submenu: [{text: string; link: string},{text: string; link: string}]}}
 */
const system = {
  text: '系统管理',
  icon: 'fa fa-gears text-center',
  alert: 'child',
  submenu: [
    {
      text: '平台系统',
      link: '/main/system/sys-platform'
    },
    {
      text: '管理员管理',
      link: '/main/system/admins'
    },
    {
      text: '密码修改',
      link: '/main/system/password'
    }
  ]
};

/**
 * 机构管理
 * @type {{text: string; link: string; icon: string}}
 */
const organ = {
  text: '组织架构',
  link: '/main/organ',
  icon: 'fa fa-sitemap text-center'
};

/**
 * 权限管理
 * @type {{text: string; link: string; icon: string}}
 */
const limit = {
  text: '权限管理',
  link: '/main/limit',
  icon: 'fa fa-lock text-center'
};

/**
 * 角色管理
 * @type {{text: string; link: string; icon: string}}
 */
const role = {
  text: '角色组管理',
  icon: 'fa fa-group text-center',
  alert: 'child',
  submenu: [
    {
      text: '角色组管理',
      link: '/main/role/roleGroup'
    },
    {
      text: '角色管理',
      link: '/main/role/roleList'
    }
  ]
};

/**
 * 账户管理
 * @type {{text: string; link: string; icon: string}}
 */
/*const account = {
  text: '账户管理',
  icon: 'fa fa-user text-center',
  elink: 'http://www.baidu.com/',
  alert: 'child',
  submenu: [
    {
      text: '管理员管理',
      link: '/account/v1'
    },
    {
      text: '员工账户管理',
      link: '/account/v2'
    }
  ]
};*/
const SystemMain = {
  text: '测试菜单',
  heading: true
};
const datatables = {
  text: '列表',
  link: '/main/datatables',
  icon: 'icon-chart',
  submenu: [
    {
      text: 'datatables',
      link: '/main/datatables/datatable'
    },
    {
      text: 'ng2-datatable',
      link: '/main/datatables/ng2-datatable'
    }
  ]
};
const msg = {
  text: '弹框和消息通知',
  link: '/main/msg',
  icon: 'icon-volume-2'
};
const echarts = {
  text: 'echarts图表',
  link: '/main/echarts',
  icon: 'fa fa-bar-chart'
};
const operationpage = {
  text: '操作页面',
  link: '/main/operationpage',
  icon: 'icon-doc'
};
const navtree = {
  text: '树',
  link: '/main/navtree',
  icon: 'fa fa-code-fork'
};
const buttons = {
  text: '按钮',
  link: '/main/buttons',
  icon: 'fa fa-toggle-off'
};

/**
 * 菜单配置
 */
export let menu = [
  buttons,
  echarts,
  msg,
  operationpage,
  datatables
];
