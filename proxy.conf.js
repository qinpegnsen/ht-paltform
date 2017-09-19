const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/admin",
      "/article",
      "/goodsKind",
      "/goodsEdit",
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
    target: "http://192.168.10.167:8081",   //拦截 context配置路径，经过此地址
    // target: "http://192.168.10.112:8080",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/res"
    ],
    target: "http://192.168.10.167:8900",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/upload"
    ],
    // target: "http://192.168.10.111:8813",   //拦截 context配置路径，经过此地址
    target: "http://192.168.10.167:8900",   //拦截 context配置路径，经过此地址
    // target: "http://192.168.10.112:8082",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
