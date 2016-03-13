Date.prototype.format = function(format = 'yyyy-MM-dd'){
    let date = this;
    let map = {
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "h": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
    };
    format = format.replace(/([yMdhms])+/g, (all, t) => {
        let v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format.replace(/&/g, '');
};