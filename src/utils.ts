export function toInteger(dirtyNumber: number) {
  return dirtyNumber < 0 ? Math.ceil(dirtyNumber) : Math.floor(dirtyNumber);
}
