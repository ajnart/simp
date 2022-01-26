
const firstLetter = (data: string) => {
  return data[0];
};

const lastLetter = (data: string) => {
  return data[-1];
}

const length_ = (data: string) => {
    return data.length;
}

const reverse = (data: string) => {
    return data.split('').reverse().join('');
}

const upper = (data: string) => {
    return data.toUpperCase();
}

const lower = (data: string) => {
    return data.toLowerCase();
}

const capitalize = (data: string) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}

const camelCase = (data: string) => {
    return data.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); }).replace(/\s/g, '');
}

const snakeCase = (data: string) => {
    return data.replace(/\s/g, '_').toLowerCase();
}

const default_ = (data: string) => {
    return data;
}

const attributes = [
    firstLetter,
    lastLetter,
    length_,
    reverse,
    upper,
    lower,
    capitalize,
    camelCase,
    snakeCase,
    default_
]

export default attributes;
