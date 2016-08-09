export const TIME_VIEWS = ['hour', 'minute', 'second']; // the order do make sense

export const ALL_VIEWS = ['decade', 'year', 'month', 'day', 'time'];

export function isTimeView(view) {
    return TIME_VIEWS.indexOf(view) !== -1
}

export function compareView(viewA, viewB) {
    let a = ALL_VIEWS.indexOf(viewA);
    let b = ALL_VIEWS.indexOf(viewB);
    if (a < b) {
        return 1
    } else if (a === b) {
        return 0
    } else {
        return -1
    }
}

export function getForwardView(baseView, forwardStep) {
    let idx = ALL_VIEWS.indexOf(baseView);
    return ALL_VIEWS[idx + forwardStep]
}

export function getViewFromMode(mode) {
    if (isTimeView(mode)) {
        return 'time'
    }
    return mode
}
