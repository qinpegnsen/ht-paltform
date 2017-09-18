const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/admin",
      "/article",
      "/goodsKind",
      "/goodsBrand",
      "/agentArea",
      "/agent",
      "/articleClass",
      "/articleComment",
      "/articleSyd",
      "/custAddr",
      "/cust",
      "/custFavorites",
      "/custInvoice",
      "/datadict",
      "/goodsAudit",
      "/goodsBrand",
      "/goodsChangeRec",
      "/goodsEnum",
      "/goodsQuery",
      "/goodsStorage",
      "/goodsSyd",
      "/goodsUnit",
      "/adminLogin",
      "/agentLogin",
      "/custLogin",
      "/seller",
      "/store",
      "/storeExpressTpl",
      "/expressTpl",
      "/storeExpressTpl",
      "/helpKind",
      "/helpQuestions"
    ],
    // target: "http://192.168.10.111:8811",   //拦截 context配置路径，经过此地址
    target: "http://192.168.10.109:8085",   //拦截 context配置路径，经过此地址
    // target: "http://192.168.10.112:8080",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/login2",
      "/elder"
    ],
    target: "http://192.168.10.110:8086",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/goodsEdit"
    ],
    target: "http://192.168.10.109:8088",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/upload"
    ],
    // target: "http://192.168.10.111:8813",   //拦截 context配置路径，经过此地址
    target: "http://192.168.10.182:8003",   //拦截 context配置路径，经过此地址
    // target: "http://192.168.10.112:8082",   //拦截 context配置路径，经过此地址
    secure: false
  }
  ,
  {
    context: [
      "/res"
    ],
    target: "http://192.168.10.109:8082",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
