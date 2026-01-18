export interface EditPosition {
  position: number;
  added: number;
  removed: number;
}

/**
 * Find where the edit happened by comparing old and new strings
 * Returns the position where the edit occurred, and how many characters were added/removed
 */
export function findEditPosition(oldStr: string, newStr: string): EditPosition {
  // Find common prefix length
  let prefixLen = 0;
  while (
    prefixLen < oldStr.length &&
    prefixLen < newStr.length &&
    oldStr[prefixLen] === newStr[prefixLen]
  ) {
    prefixLen++;
  }

  // Find common suffix length (from the end, not overlapping with prefix)
  let suffixLen = 0;
  while (
    suffixLen < oldStr.length - prefixLen &&
    suffixLen < newStr.length - prefixLen &&
    oldStr[oldStr.length - 1 - suffixLen] ===
      newStr[newStr.length - 1 - suffixLen]
  ) {
    suffixLen++;
  }

  const removed = oldStr.length - prefixLen - suffixLen;
  const added = newStr.length - prefixLen - suffixLen;

  return { position: prefixLen, added, removed };
}
