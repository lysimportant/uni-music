import hjRequest from '..'

export function getIndexBannerService() {
  return hjRequest.get({ url: '/banner?type=1' })
}
