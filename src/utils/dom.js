export function getViewPortSize(elem) {
    elem = elem || window;
    if (elem === window) {
        if (elem.innerWidth != null)
            return {w: elem.innerWidth, h: elem.innerHeight};
        elem = document.documentElement || document.body;
        return {w: elem.clientWidth, h: elem.clientHeight};
    } else {
        return {w: elem.clientWidth, h: elem.clientHeight};
    }
}

export function getBoundingClientRect(elem, container) {
    if (container === window) {
        return elem.getBoundingClientRect();
    }
    let position = getScrollPosition(elem, container);
    let scrollTop = container.scrollTop;
    let scrollLeft = container.scrollLeft;
    let height = elem.offsetHeight;
    let width = elem.offsetWidth;
    let top = position.y - scrollTop;
    let bottom = top + height;
    let left = position.x - scrollLeft;
    let right = left + width;
    return {
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        width: width,
        height: height
    }
}

export function getScrollPosition(elem, container) {
    let x = 0, y = 0;
    let x2 = 0, y2 = 0;
    while (elem != null) {
        x += elem.offsetLeft;
        y += elem.offsetTop;
        elem = elem.offsetParent;
    }
    if (container) {
        let position = getScrollPosition(container);
        x2 = position.x;
        y2 = position.y;
    }
    return {x: x - x2, y: y - y2};
}
