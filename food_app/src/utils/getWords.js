export function parseIngredientList(str) {
  if (!str?.trim()) return [];
  return str
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formatIngredientList(items) {
  return (items || []).join("\n");
}

export function getWords(str) {
  return str.split(",").map((word) => word.trim());
}

export function getWord(str) {
  return str.split("|").map((word) => word.trim());
}
