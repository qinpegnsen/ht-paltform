/**
 * 菜单管理
 * @type {{text: string; link: string; icon: string; submenu: [{text: string; link: string},{text: string; link: string}]}}
 */
const website = {
  text: '站点设置',
  icon: 'icon-settings',
  link: '/website',
  submenu: [
    {
      text: '地区设置',
      icon: 'fa fa-area-chart',
      link: '/website/areas'
    },
    {
      text: '数据字典',
      icon: 'fa fa-book',
      link: '/website/dataDictionary'
    },
    {
      text: '计量单位',
      icon: 'fa fa-calculator',
      link: '/website/measure'
    }
  ]
};
const operation = {
  text: '运营管理',
  icon: 'fa fa-sitemap',
  link: '/DBO',
  submenu: [
    {
      text: '快递公司',
      icon: 'fa fa-truck',
      link: '/DBO/delivery'
    },
    {
      text: '文章管理',
      icon: 'icon-book-open',
      alert: '▼',
      submenu: [
        {
          text: '文章分类',
          link: 'DBO/article/sort'
        },
        {
          text: '文章管理',
          link: 'DBO/article/manage'
        }
      ]
    },
    {
      text: '保障服务',
      icon: 'icon-diamond',
      link: '/DBO/ensure'
    },
    {
      text: '售后保障',
      icon: 'fa fa-shield',
      link: '/DBO/after-ensure'
    }
  ]
};
const goods = {
  text: '商品管理',
  icon: 'fa fa-cubes',
  link: '/goods',
  submenu: [
    {
      text: '商品发布',
      icon: 'fa fa-cube',
      link: '/goods/publish'
    },
    {
      text: '商品管理',
      icon: 'fa fa-cubes',
      link: '/goods/manage'
    },
    {
      text: '分类管理',
      icon: 'fa fa-cubes',
      alert: '▼',
      submenu: [
        {
          text: '分类管理',
          link: '/goods/sorts/manage'
        },
        {
          text: '属性模板',
          link: '/goods/sorts/properties'
        }
      ]
    },
    {
      text: '品牌管理',
      icon: 'fa fa-cubes',
      link: '/goods/brands'
    }
  ]
};
const shop = {
  text: '店铺管理',
  icon: 'fa fa-institution',
  link: '/shops',
  submenu: [
    {
      text: '店铺管理',
      icon: 'fa fa-institution',
      link: '/shops/manage'
    },
    {
      text: '店铺账号管理',
      icon: 'fa fa-institution',
      link: '/shops/account'
    }
  ]
};
const member = {
  text: '会员管理',
  icon: 'fa fa-users',
  link: '/member',
  submenu: [
    {
      text: '会员管理',
      icon: 'fa fa-user',
      link: '/member/users'
    },
    {
      text: '积分管理',
      icon: 'fa fa-ticket',
      alert: '▼',
      submenu: [
        {
          text: '积分增减',
          link: '/member/integration/change'
        }
      ]
    }
  ]
};
const orders = {
  text: '订单管理',
  icon: 'fa fa-file-text',
  link: '/orders',
  submenu: [
    {
      text: '商品订单',
      icon: 'fa fa-file-text-o',
      link: '/orders/order'
    },
    {
      text: '评价管理',
      icon: 'fa fa-smile-o',
      alert: '▼',
      submenu: [
        {
          text: '店铺评价',
          link: '/orders/evaluate/shop'
        },
        {
          text: '买家评价',
          link: '/orders/evaluate/buyer'
        }
      ]
    }
  ]
};
const sale = {
  text: '售前售后',
  icon: 'icon-earphones-alt',
  link: '/sale',
  submenu: [
    {
      text: '退款',
      icon: 'fa fa-money',
      alert: '▼',
      submenu: [
        {
          text: '退款管理',
          link: '/sale/refund/manage'
        },
        {
          text: '退款审核',
          link: '/sale/refund/verify'
        }
      ]
    },
    {
      text: '退货',
      icon: 'fa fa-retweet',
      alert: '▼',
      submenu: [
        {
          text: '退货管理',
          link: '/sale/return/manage'
        },
        {
          text: '退货审核',
          link: '/sale/return/verify'
        }
      ]
    },
    {
      text: '退货退款原因',
      icon: 'icon-question',
      link: '/main/msg'
    }
  ]
};
const statistics = {
  text: '统计管理',
  icon: 'fa fa-bar-chart',
  link: '/stat',
  submenu: [
    {
      text: '统计设置',
      icon: 'fa fa-cogs',
      alert: '▼',
      submenu: [
        {
          text: '订单金额区间',
          link: '/stat/set/order-money'
        },
        {
          text: '商品价格区间',
          link: '/stat/set/goods-price'
        },
        {
          text: '统计缓存重置',
          link: '/stat/set/cache-reset'
        }
      ]
    },
    {
      text: '会员统计',
      icon: 'fa fa-users',
      alert: '▼',
      submenu: [
        {
          text: '新增会员',
          link: '/stat/users/new'
        },
        {
          text: '会员分析',
          link: '/stat/users/analyze'
        },
        {
          text: '区域分析',
          link: '/stat/users/area'
        },
        {
          text: '购买分析',
          link: '/stat/users/buy'
        }
      ]
    },
    {
      text: '销量分析',
      icon: 'fa fa-line-chart',
      alert: '▼',
      submenu: [
        {
          text: '结算统计',
          link: '/stat/sales/settle'
        },
        {
          text: '订单统计',
          link: '/stat/sales/order'
        }
      ]
    },
    {
      text: '商品分析',
      icon: 'fa fa-cube',
      alert: '▼',
      submenu: [
        {
          text: '热卖商品',
          link: '/stat/goods/hot-sale'
        },
        {
          text: '商品销售明细',
          link: '/stat/goods/sale-detail'
        }
      ]
    },
    {
      text: '售后分析',
      icon: 'icon-chart',
      alert: '▼',
      submenu: [
        {
          text: '退款统计',
          link: '/stat/after/refund'
        },
        {
          text: '退货统计',
          link: '/stat/after/return'
        }
      ]
    }
  ]
};
const agent = {
  text: '代理商管理',
  icon: 'fa fa-users',
  link: '/agent',
  submenu: [
    {
      text: '代理商管理',
      icon: 'fa fa-users',
      link: '/agent/agent'
    },
    {
      text: '代理区域管理',
      icon: 'icon-location-pin',
      link: '/agent/region'
    },
    {
      text: '进货管理',
      icon: 'fa fa-cubes',
      link: '/agent/stock'
    }
  ]
};
const app = {
  text: 'APP管理',
  icon: 'icon-screen-smartphone',
  link: '/app',
  submenu: [
    {
      text: '应用设置',
      icon: 'fa fa-wrench',
      link: '/app/use-set'
    },
    {
      text: '消息推送',
      icon: 'icon-speech',
      link: '/app/msg-push'
    }
  ]
};


/**
 * 菜单配置
 */
export let menu = [
  website,
  operation,
  goods,
  shop,
  member,
  orders,
  sale,
  statistics,
  agent,
  app
];
