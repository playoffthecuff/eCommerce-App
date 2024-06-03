export function toTitleCaseWithSpaces(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

export function toTitleCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}
