dnd = {};

(function(){
    var glieseLog = false;
    _callback = null;

    /** 
     * Deprecated
     */ 
    function receive(event,element) {
        if(window.console)  { 
            console.log(111);
        }
        alert(111);
        var data = event.dataTransfer.items;
        var i = 0;
        for(;i<data.length;i++) {
            if(data[i].kind == "file" && (data[i].type.match('^image/'))) {

                var img = new Image();
                img.src = window.createObjectURL(data[i].getAsFile());
                elememt.appendChild(img);
            }
        }

    }

    function isSupportDnd() {

        /**
         * How to determine presence of HTML5 drag'n'drop file upload API (like the one from FF3.6)
         *
         */
        if(window.console){
            console.log(!!(window.File && window.FileList && window.FileReader));
            if(!(window.File && window.FileList && window.FileReader)){
                return false;
            } 

        }
        /**
         * webkit doesn't expose the DataTransfer object 
         */
        if(!window.DataTransfer || !"files" in DataTransfer.prototype) {
            if(window.console) {
                console.log("Your Browser doesn't supports window.DataTransfer,not HTML5 File upload API");
            }
        }
        // init event handlers
        //
        //
        if(window.console) {

            console.log((window.addEventListener));
            console.log(typeof(window.attachEvent));
        }
        return true;
    }
    /**
     *  override the follow event handle functions.
     */ 
    dnd.dragEnter = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if(window.console) { 
            console.log("dragEnter");
        }
    };
    dnd.dragExit = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if(window.console) { 
            console.log("dragExit");
        }

    };
    dnd.dragOver = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if(window.console && glieseLog)  { 
            console.log("dragOver");
        }
        /**
         *   called every about ten milleseconds
         */
        //if(window.console) console.log((new Date()).getTime());



    };

    dnd.drop= function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files;
        var count = files.length;

        // Only call the handler if 1 or more files was dropped.
        if (count > 0){
            _callback(files); 
        }
    };

    dnd.bindDragAndDrop = function (box,callback){
        if(!callback) return ;
        if(!isSupportDnd()) return;
        if(typeof(window.addEventListener)  != "undefined") {
            box.addEventListener("dragenter",dnd.dragEnter,false);
            box.addEventListener("dragexit",dnd.dragExit,false);
            box.addEventListener("dragover",dnd.dragOver,false);
            box.addEventListener("drop",dnd.drop,false);
        }
        _callback = callback;
    };
})();

