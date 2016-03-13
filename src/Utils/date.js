export function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export function getDate(value) {
    // todo should return valid date or just null
    return new Date(value)
}

export function compareDate(dateA, dateB, toMode = 'day') {
    let format;
    let map = {
        year: 'yyyy',
        month: 'yyyy/MM',
        day: 'yyyy/MM/dd',
        hour: 'yyyy/MM/dd hh',
        minute: 'yyyy/MM/dd hh:mm'
    };
    format = map[toMode];
    dateA = new Date(dateA);
    dateB = new Date(dateB);
    return dateA.format(format) === dateB.format(format);
}
