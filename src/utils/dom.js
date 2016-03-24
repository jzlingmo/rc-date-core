export function getViewPortSize(w) {
    w = w || window;
    if (w.innerWidth != null)
        return {w: w.innerWidth, h: w.innerHeight};
    let elem = d.documentElement || d.body;
    return {w: elem.clientWidth, h: elem.clientHeight};
}
