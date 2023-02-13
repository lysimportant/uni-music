import hjRequest from "..";

/**
 * 返回歌曲URL
 * @param id 音乐的ID
 * @returns 音乐的URL
 */
export function getMusicURLByIdService(id: string) {
  return hjRequest.get({ url: `/song/url/v1?id=${id}&level=exhigh` });
}
/**
 * 检测音乐是否可以播放
 * @param id 音乐的ID
 * @returns 是否可以播放
 */
export function getCheckMusicURLByIdService(id: string) {
  return hjRequest.get({ url: `/check/music?id=${id}` });
}
/**
 *返回歌曲详情
 * @param id 音乐ID
 * @returns 音乐的详情
 */
export function getMusicDetailByIdService(id: string) {
  return hjRequest.get({ url: `/song/detail?ids=${id}` });
}
