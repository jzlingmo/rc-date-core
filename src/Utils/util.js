export function range(start, count) {
    let arr = [];
    for (let n = 0; n < count; n++) {
        arr.push(start + n)
    }
    return arr
}