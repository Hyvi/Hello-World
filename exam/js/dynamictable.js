/*jshint node: true */
/*global util:true*/

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}
var dt = (function(){
    var col,row,button,st,u = util;
    var init = function(){
        col = u.getById('col');
        row = u.getById('row');
        button = u.getById('button');
        st = u.getById('st');

    };
    var toArray =  function (obj) {
        var array = [];
        // iterate backwards ensuring that length is an UInt32
        for (var i = obj.length; i--;) { 
            array[i] = obj[i];
        }
        return array;
    } ;
    var createTable = function(tbody,rval,cval){
       for (var i = 0; i < rval; i++) {
           var tr = document.createElement('TR');
           for (var j = 0; j < cval; j++) {
              var td = document.createElement('TD'); 
              tr.appendChild(td);
           }
           tbody.appendChild(tr);
       }
    };

    var bindevent = function(){
        u.addevent(row,'blur',function(){
            if(u.check(row.value,10) === false){
               alert("输入不正确，请输入不超过10的整数"); 
            }
        });
        u.addevent(col,'blur',function(){
            if(u.check(col.value,10) === false){
               alert("输入不正确，请输入不超过10的整数"); 
            }
        });
        u.addevent(st,'click',function(e){
                   var ev = e || window.event;
                   var t = ev.target || ev.srcElement;
                   var tcol = t;
                   var trow = t.parentNode;
                   var cl = trow.childNodes;
                  // var clarr = Array.prototype.slice.call(cl);
                   var clarr = toArray(cl); 
                   var c = clarr.indexOf(tcol)+1
                   var ttable = t.parentNode.parentNode;
                   var r = toArray(ttable.childNodes).indexOf(trow)+1;
                   alert("第"+r+"行, 第"+c+"列");
        });

        u.addevent(button,'click',function(){
            if(u.check(row.value,10)===false || u.check(col.value,10) === false){
               alert("输入不正确，请输入不超过10的整数"); 
            }else{
               createTable(st,parseInt(row.value,10),parseInt(col.value,10));           
            }
        });

    };
    return {
        ready : function(){
           init();
           bindevent();
        }
    };
    
}());
dt.ready();
