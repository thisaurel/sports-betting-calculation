export function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}
export function round2(num) {
    return isNumber(num) ? (Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2)) : 0;
}