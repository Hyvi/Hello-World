/*jshint node: true */
/*global util:true*/
var lefttime = (function(){
    var seconds,button,hour,minute,second,inter;
    var getById = util.getById;
    var addevent = util.addevent;
    var check = util.check;
    
    var init  = function(){
        seconds = getById("seconds");
        button = getById('button');
        hour = getById('minute');
        minute = getById('minute');
        second = getById('second');

    };

    var showTime = function(val){
        var hval = Math.floor(val/3600);     
        var mval = Math.floor((val - hval*3600)/60);
        var sval = val - hval*3600 - mval*60;
        hour.innerHTML = hval>9?hval:"0"+hval;
        minute.innerHTML = mval>9?mval:"0"+mval;
        second.innerHTML = sval>9?sval:"0"+sval;
    }

    var bindevent = function(){
    
       addevent(seconds,"blur",function(){
            if(check(seconds.value,5000) === false){
                alert("输入不正确，请输入一个不超过5000的整数");
            }
       }); 

       addevent(button,'click',function(){
           var val = check(seconds.value,5000);
          if(val === false){
                alert("输入不正确，请输入一个不超过5000的整数");
                return;
          }else{
            var interval = function(){
                showTime(val);
                if(val === 0){
                    clearInterval(inter);
                    return ;
                }
                val--;
            }
            if(inter){
                clearInterval(inter);
            }
            inter = setInterval(interval,1000);
          } 

       });
    };

    return {
        ready:function(){
            init();
            bindevent();
        }
    };

}());

lefttime.ready();
