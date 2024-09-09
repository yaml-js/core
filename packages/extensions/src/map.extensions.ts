declare interface Map<K, V> {
  map<T>(callbackfn: (value: V, key: K) => T): T[]

  getOrSet(key: K, factory: (key: K) => V): V
}

Map.prototype.map = function <K, V, T>(this: Map<K, V>, callbackfn: (value: V, key: K) => T): T[] {
  const result: T[] = []
  this.forEach((value, key) => {
    result.push(callbackfn(value, key))
  })
  return result
}

Map.prototype.getOrSet = function <K, V>(this: Map<K, V>, key: K, factory: (key: K) => V): V {
  let value = this.get(key)
  if (value === undefined) {
    value = factory(key)
    this.set(key, value)
  }
  return value
}
