export function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export function getDate(value) {
    // todo should return valid date or just null
    return new Date(value)
}

let methodMap = {
    'year': 'FullYear',
    'month': 'Month',
    'day': 'Date',
    'hour': 'Hours',
    'minute': 'Minutes'
};

export function add(date, num, type) {
    type = methodMap[type];
    let getter = 'get' + type;
    let setter = 'set' + type;
    date[setter](date[getter]() + num);
    return new Date(date)
}

export function format(date, formatStr = 'yyyy-MM-dd') {
    date = new Date(date);
    let map = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    };
    formatStr = formatStr.replace(/([yMdhms])+/g, (all, t) => {
        let v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(-2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return formatStr.replace(/&/g, '');
}


const formatMap = {
    year: 'yyyy',
    month: 'yyyy/MM',
    day: 'yyyy/MM/dd',
    hour: 'yyyy/MM/dd hh',
    minute: 'yyyy/MM/dd hh:mm'
};

export function compareDate(dateA, dateB, toMode = 'day') {
    let formatStr;
    formatStr = formatMap[toMode];
    dateA = new Date(dateA);
    dateB = new Date(dateB);
    return format(dateA, formatStr) === format(dateB, formatStr);
}
