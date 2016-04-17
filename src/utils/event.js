const eventSplitter = /\s+/;

const canAttach = !!window.attachEvent;
const actorName = {
    on: canAttach ? 'attachEvent' : 'addEventListener',
    off: canAttach ? 'detachEvent' : 'removeEventListener',
};

const eventListen = (target, events, type, callback)=> {
    let event;
    events = events.split(eventSplitter);
    let actor = actorName[type];
    while (event = events.shift()) {
        if (canAttach) {
            target[actor](type + event, callback)
        } else {
            target[actor](event, callback, false)
        }
    }
};

export function eventOn(target, events, callback) {
    eventListen(target, events, 'on', callback)
}

export function eventOff(target, events, callback) {
    eventListen(target, events, 'off', callback)
}
