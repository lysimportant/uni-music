import hjRequest from "..";

export function getIndexHotDjService() {
  return hjRequest.get({ url: "/dj/program/toplist?limit=5" });
}

/**
 *返回播放中的数据
 * @param id 播客ID
 * @returns 返回播放播客的详情  // id 详情  miansong.id 播放 电台详情 radio.id
 */
export function getDjPlayDetailService(id: any) {
  return hjRequest.get({ url: "/dj/program/detail?id=" + id });
}

/**
 *返回播放中的数据
 * @param id
 * @returns
 */
export function getDjDetailService(id: any) {
  return hjRequest.get({ url: "/dj/detail?rid=" + id });
}

/**
 *推荐播客
 * @returns 推荐数据
 */
export function getReommendDjService() {
  return hjRequest.get({ url: "/dj/hot" });
}

/**
 * 返回播客全部数据
 * @param id 播客ID
 * @returns 返回播客数据
 */
export function getDjAllDetailService(id: any) {
  return hjRequest.get({ url: `/dj/program?rid=${id}` });
}
