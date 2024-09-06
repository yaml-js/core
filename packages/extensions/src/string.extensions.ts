// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface String {
  toCamelCase(): string
  toSnakeCase(): string
  splitLines(): string[]
}

const REGEXS = {
  nonAlphanumeric: /[^a-zA-Z0-9]+/g,
  camelToSnakeCase: /([a-z\d])([A-Z])/g,
  consecutiveUppercase: /([A-Z]+)([A-Z][a-z\d]+)/g,
  spacesAndHyphens: /[-\s]+/g,
  lineBreak: /\r?\n/
}

String.prototype.splitLines = function (this: string): string[] {
  if (this.length === 0) return []

  return this.split(REGEXS.lineBreak)
}

String.prototype.toCamelCase = function (this: string): string {
  if (this.length === 0) return ''

  const nonAlphanumeric = this.replace(REGEXS.nonAlphanumeric, ' ')

  const words = nonAlphanumeric
    //.replace(REGEXS.nonAlphanumeric, ' ') // Replace non-alphanumeric characters with spaces
    .split(' ') // Split the string into words

  return words
    .map((word, index) => {
      if (index === 0) return word.toLowerCase() // Convert the first word to lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of subsequent words
    })
    .join('') // Join the words without spaces
}

String.prototype.toSnakeCase = function (this: string): string {
  if (this.length === 0) return ''

  return this.replace(REGEXS.camelToSnakeCase, '$1_$2') // Handle camelCase to snake_case
    .replace(REGEXS.consecutiveUppercase, '$1_$2') // Handle consecutive uppercase letters
    .replace(REGEXS.spacesAndHyphens, '_') // Replace spaces and hyphens with underscores
    .toLowerCase() // Convert to lowercase
}
