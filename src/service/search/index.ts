import hjRequest from "..";

export function getSearchDefaultService() {
  return hjRequest.get({ url: "/search/default" });
}

export function getSearchHotListService() {
  return hjRequest.get({ url: "/search/hot/detail" });
}

export function getSearchByNameService(key: string, type = 1, limit = 30, offset = 0) {
  console.log("first get", type);
  return hjRequest.get({
    url: `/search?keywords=${key}&type=${type}&limit=${limit}&offset=${offset}`
  });
}
