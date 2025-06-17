export function toKebabCase(str: string): string {
  return str
    .replace(/[^\w\s]/g, '')     // remove special chars
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .join('-');
}
