import hjRequest from "..";

export function getIndexHotDjService() {
  return hjRequest.get({ url: "/dj/program/toplist?limit=5" });
}

export function getDjDetailService(id: any) {
  return hjRequest.get({ url: "/dj/program/detail?id=" + id });
}

// https://lianghj.top:3000/dj/program?rid=527651607&limit=40 // 电台歌单详情
