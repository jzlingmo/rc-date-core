export function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export function getDate(value) {
    if(!value){
        return null
    }
    if(typeof value === 'string'){
        value = value.replace(/-/g, '/')
    }
    let date = new Date(value);
    if(isNaN(date.getTime())){
        return null
    }
    return date
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

export function format(date, formatStr = 'yyyy/MM/dd') {
    date = getDate(date);
    if(date == null){
        return ''
    }
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

export function getModeFormat(mode) {
    const formatStr = 'yyyy/MM/dd hh:ss';
    const lenMap = {
        year: 4,
        month: 7,
        day: 10,
        hour: 16
    };
    return formatStr.substr(0, lenMap[mode])
}


const formatMap = {
    year: 'yyyy',
    month: 'yyyy/MM',
    day: 'yyyy/MM/dd',
    hour: 'yyyy/MM/dd hh',
    minute: 'yyyy/MM/dd hh:mm'
};

export function compareDate(dateA, dateB, toMode = 'day') {
    if(!dateA || !dateB){
        return -2
    }
    let formatStr;
    formatStr = formatMap[toMode];
    dateA = format(new Date(dateA), formatStr);
    dateB = format(new Date(dateB), formatStr);
    if(dateA > dateB){
        return 1
    }else if(dateA === dateB){
        return 0
    }else{
        return -1
    }
}
