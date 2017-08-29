const PROXY_CONFIG = [
  {
    context: [
      "/article",
      "/goodsKind",
      "/goodsBrand",
      "/agentArea",
      "/agent",
      "/articleClass",
      "/articleComment",
      "/article",
      "/articleSyd",
      "/custAddr",
      "/cust",
      "/custFavorites",
      "/custInvoice",
      "/datadict",
      "/goodsAudit",
      "/goodsBrand",
      "/goodsChangeRec",
      "/goodsEdit",
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
      "/storeExpressTpl"
    ],
    target: "http://192.168.10.167:8081",   //拦截 context配置路径，经过此地址
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
      "/upload"
    ],
    target: "http://192.168.10.110:8083",   //拦截 context配置路径，经过此地址
    secure: false
  }
  ,
  {
    context: [
      "/res"
    ],
    target: "http://192.168.10.182:8003",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
