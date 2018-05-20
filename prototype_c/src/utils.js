export function firstWord(str) {
  const index = str.indexOf(" ");
  return index === -1 ? str : str.substring(0, index);
}

const seq = {};

function nextSeq(type) {
  if (!seq[type]) { seq[type] = 0 }
  return seq[type]++;
}

function withPrefix(prefix, str) {
  return prefix ? prefix + '-' + str : str;
}

export function nextId(type, prefix) {
  return withPrefix(prefix, nextSeq(type));
}

export const withDefault = (defaultValue) =>
  (value = defaultValue) => value;

