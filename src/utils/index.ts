export * from "./audio";
export * from "./format";
export * from "./debounce";
export * from "./navigate";
/**
 *返回一个字符串
 * @param name 名字
 * @param index 索引
 * @param all 长度
 * @returns 返回一个字符串
 */
export function handler_(name: string, index: number, all: number) {
  return index === all ? name : name + "-";
}
