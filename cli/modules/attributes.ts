const firstLetter = (data: string): string => {
  return data[0];
};

const lastLetter = (data: string): string => {
  return data[data.length - 1];
};

const length = (data: string): string => {
  return data.length.toString();
};

const reverse = (data: string): string => {
  return data.split("").reverse().join("");
};

const toUpper = (data: string): string => {
  return data.toUpperCase();
};

const toLower = (data: string): string => {
  return data.toLowerCase();
};

const reversed = (data: string): string => {
  return data.split("").reverse().join("");
};

const capitalize = (data: string): string => {
  return data.charAt(0).toUpperCase() + data.slice(1);
};

const camelCase = (data: string): string => {
  return data.replace(/\s(.)/g, function ($1) {
    return $1.toUpperCase();
  }).replace(/\s/g, "");
};

const snakeCase = (data: string): string => {
  return data.replace(/\s/g, "_").toLowerCase();
};

const default_ = (data: string): string => {
  return data;
};

export const attributesList = [
  firstLetter,
  lastLetter,
  length,
  reverse,
  toUpper,
  toLower,
  reversed,
  capitalize,
  camelCase,
  snakeCase,
  default_,
];
