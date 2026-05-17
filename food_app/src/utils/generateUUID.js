export function getuuid() {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(16).substring(2);
  return `${timestamp}-${randomPart}`;
}
