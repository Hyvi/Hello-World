var glieseLog = false;
_callback = null;

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
var box = document.getElementById("box");

/**
 * How to determine presence of HTML5 drag'n'drop file upload API (like the one from FF3.6)
 *
 */
if(window.console){
    console.log(!!(window.File && window.FileList && window.FileReader));

}
/**
 * webkit doesn't expose the DataTransfer object 
 */
if(window.DataTransfer !== undefined && "files" in DataTransfer.prototype) {
   if(window.console) {
       console.log(DataTransfer.prototype);
       console.log("Your Browser supports HTML5 File upload API");
   }

}
// init event handlers
//
//
if(window.console) {
    
    console.log((window.addEventListener));
    console.log(typeof(window.attachEvent));
}


function dragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if(window.console) { 
        console.log("dragEnter");
    }
}
function dragExit(evt) {
     evt.stopPropagation();
    evt.preventDefault();
    if(window.console) { 
        console.log("dragExit");
    }

}
function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if(window.console && glieseLog)  { 
        console.log("dragOver");
    }
    /**
     *   called every about ten milleseconds
     */
    //if(window.console) console.log((new Date()).getTime());



}
function handleReaderLoadEnd(evt) {
  if(window.console){ 
      console.log(evt.target.result);
  }
 // var img = document.getElementById("preview");
  var img = new Image();
  
  img.src = evt.target.result;
  box.appendChild(img);
}


function handleFiles(files){
    var file = files[0];

    //document.getElementById("droplabel").innerHTML = "Processing " + file.name;

    var reader = new FileReader();

    // init the reader event handlers
    if(typeof _callback == 'function')
        reader.onloadend = handleReaderLoadEnd;

    // begin the read operation
    reader.readAsDataURL(file);

}



function drop (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var count = files.length;

    // Only call the handler if 1 or more files was dropped.
    if (count > 0){
        _callback(files); 
    }
}

function bindDragAndDrop (box,callback){
    if(!callback) return ;
    if(typeof(window.addEventListener)  != "undefined") {
        box.addEventListener("dragenter",dragEnter,false);
        box.addEventListener("dragexit",dragExit,false);
        box.addEventListener("dragover",dragOver,false);
        box.addEventListener("drop",drop,false);
    }
    _callback = callback;
}
if(box) 
    bindDragAndDrop(box,handleFiles);

