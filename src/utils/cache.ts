class Cache {
  set(key: string, val: any) {
    uni.setStorageSync(key, JSON.stringify(val));
  }
  get(key: string) {
    if (!uni.getStorageSync(key)) return;
    return JSON.parse(uni.getStorageSync(key));
  }

  remove(key: string) {
    uni.removeStorageSync(key);
  }

  clear() {
    uni.clearStorageSync();
  }
}

const cache = new Cache();
export { cache };
