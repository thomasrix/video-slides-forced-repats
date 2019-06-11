export function create (type, parent, classname){
    // Genbruges til at bygge elementer i DOM strukturen
    var el = document.createElement(type);
    if(classname != undefined){
        if(classname.constructor === Array){
            classname.forEach(function(item){
                el.classList.add(item);
            })
        }else if (classname.constructor === String){
            el.classList.add(classname);
        }
    }
    if(parent){
        parent.appendChild(el);
    }
    return el;
};
export function select (s, e = document){
    // Shortcut to select dom elements
    return e.querySelector(s);
};
export function selectAll (s, e = document){
    // Shortcut to select dom elements
    return e.querySelectorAll(s);
}
export function replaceLineBreaks(t){
    return t.replace(/(?:\r\n|\r|\n)/g, '<br/>');
}
export function addPlayingPropertyToMedia() {
    Object.defineProperty(HTMLMediaElement.prototype, 'isplaying', {
        get: function get() {
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        },
        configurable: true });
}
export function fetchFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = httpRequest.responseText;
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}