export function range(start, count) {
    let arr = [];
    for (let n = 0; n < count; n++) {
        arr.push(start + n)
    }
    return arr
}

export function matrix(arr, col) {
    let matrix = [];
    let len = arr.length;
    for (let start = 0; start < len; start += col) {
        matrix.push(arr.slice(start, start + col))
    }
    return matrix
}
