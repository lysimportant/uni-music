/**
 * 防抖函数
 * @param fn 需要执行的函数
 * @param delay 延迟的时间
 * @param imditate 是否立即执行一次
 * @returns 调用的函数
 */
export function useDebounce(
  fn: (...args) => any,
  delay: number,
  imditate?: boolean
) {
  let timer: any = null;
  function debounce(...args) {
    timer && clearInterval(timer);
    imditate && fn(args);
    timer = setTimeout(() => {
      fn(args);
    }, delay);
  }
  // abort
  debounce.abort = function () {
    clearInterval(timer);
    timer = null;
  };

  return debounce;
}
