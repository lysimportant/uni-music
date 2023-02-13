export function handler_(name, index, all) {
  return index === all ? name : name + "-";
}
