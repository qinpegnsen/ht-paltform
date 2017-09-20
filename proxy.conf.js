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
      "/helpQuestions",
      "/basicExpress"
    ],
    target: "http://192.168.10.109:8085",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/upload"
    ],
    target: "http://192.168.10.182:8003",   //拦截 context配置路径，经过此地址
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
