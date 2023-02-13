import hjRequest from "..";

export function getCommunityRecommendVideos() {
  return hjRequest.get({ url: "/video/timeline/recommend" });
}
