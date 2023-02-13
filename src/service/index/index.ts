import hjRequest from "..";

/**
 *
 * @returns 轮播图数据
 */
export function getIndexBannerService() {
  return hjRequest.get({ url: "/banner?type=1" });
}
/**
 *
 * @returns 推荐模块Icon
 */
export function getIndexDiscoverIconsService() {
  return hjRequest.get({ url: "/homepage/dragon/ball" });
}
/**
 * personalized
 * @returns 返回首页推荐歌单
 */
export function getIndexRecommendService() {
  return hjRequest.get({ url: "/personalized?limit=10" });
}

/**
 * /personalized/newsong
 * @returns 返回最新的歌曲
 */
export function getIndexNewSongs() {
  return hjRequest.get({ url: "/personalized/newsong" });
}
