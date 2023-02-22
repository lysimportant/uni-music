import hjRequest from "..";

/**
 * 返回歌曲URL
 * @param id 音乐的ID
 * @returns 音乐的URL
 */
export function getMusicURLByIdService(id: string[]) {
  return hjRequest.get({ url: `/song/url/v1?id=${id.join(",")}&level=exhigh` });
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
export function getMusicDetailByIdService(id: string[]) {
  return hjRequest.get({ url: `/song/detail?ids=${id.join(",")}` });
}

export function getMusicLrcService(id: string) {
  return hjRequest.get({ url: "/lyric?id=" + id });
}

/**
 * 获取歌单数据
 * @param id 歌单的ID
 * @returns 返回歌单的详情
 */
export function getMusicSongDetailService(id: number) {
  return hjRequest.get({ url: `/playlist/detail?id=${id}` });
}
