var util =(function(){
    var reInteger = /^\d+$/;
    var isInteger = function(val){
        return reInteger.test(val);
    };

    var addevent = function(elem,type,eventHandle){
        if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle, false );

        } else if ( elem.attachEvent ) {
            elem.attachEvent( "on" + type, eventHandle );
        } 
    };

    var getById = function(id){
        return document.getElementById(id);
    };

    var html = function(elem,value){
        
        if(!value){
            return elem.innerHTML;
        }
        // Remove any remaining nodes
        while ( elem.firstChild ) { 
            elem.removeChild( elem.firstChild );
        }   
        elem.appendChild(value);
 
    }

    var check = function(str,max){
        // 输入一个不超过5000的整数，如果输入不正确
        if(!isInteger(str)){
            return false;
        }
        var val = parseInt(str,10); 
        if(val>max || val < 0 ){
            return false;
        }
        return val;
    };
    return {
        getById : getById,
        html : html,
        addevent : addevent,
        check : check
    };



}());
