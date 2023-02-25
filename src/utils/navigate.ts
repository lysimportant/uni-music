export function useNavigate(m: string, path?: string | number, ...args: any[]) {
  if (m === "back") {
    uni.navigateBack({ delta: (path as number) ?? 1 });
    return;
  }
  let params = "";
  for (let obj of args) {
    for (let key in obj) {
      params += `${key}=${obj[key]}&`;
    }
  }
  params = params.slice(0, params.length - 1);
  console.log(params);
  if (m === "page") {
    uni.navigateTo({
      url: `${path}?${params}`
    });
    return;
  }
  uni.switchTab({ url: `${path as string}?${params}` });
}
