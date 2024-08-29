declare interface Map<K, V> {
  map<T>(callbackfn: (value: V, key: K) => T): T[]
}

Map.prototype.map = function <K, V, T>(this: Map<K, V>, callbackfn: (value: V, key: K) => T): T[] {
  const result: T[] = []
  this.forEach((value, key) => {
    result.push(callbackfn(value, key))
  })
  return result
}
