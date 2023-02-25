import hjRequest from "..";

export function getSearchDefaultService() {
  return hjRequest.get({ url: "/search/default" });
}
