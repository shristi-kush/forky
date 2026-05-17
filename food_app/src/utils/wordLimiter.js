export function wordLimiter(str, limit) {
  if (str.length > limit) {
    str = str.substring(0, limit);
    str += "...";
    return str;
  }
  return str;
}
