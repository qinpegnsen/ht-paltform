/**
 * 加载完成判断
 * @param parentModule   输出模块
 * @param moduleName     模块名字
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} 已经加载。核心模块入口是AppModule.`);
  }
}
