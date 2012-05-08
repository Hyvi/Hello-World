// for test window.name
window.postMessage = null;

document.getElementById('host').innerHTML = location.host;
function send(){
    var val = document.getElementById('data').value;
    sendMessage(val);
}
(function(win, doc){
    var ifr = doc.getElementById('iframeA').contentWindow;
    var cb = function(json){
        doc.getElementById("getmsg").innerHTML = location.host+" get msg:"+json;
    };
    var sendMessage = function(){
        if(win.postMessage){
            if (win.addEventListener) {
                win.addEventListener("message",function(e){
                    cb.call(win,e.data);
                },false);
            }else if(win.attachEvent) {
                win.attachEvent("onmessage",function(e){
                    cb.call(win,e.data);
                });
            }
            return function(data){
                ifr.postMessage(data,'*');
            };
        }else{
            var hash = '';

            setInterval(function(){

                if (win.name !== hash) {
                    hash = win.name;
                    cb.call(win, hash);
                }
            }, 50);
            return function(data){
                ifr.name = data;
            };
        }
    };
    win.sendMessage = sendMessage();
})(window, document);



