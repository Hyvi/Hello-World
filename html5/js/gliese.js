function receive(event,element) {
    if(window.console) console.log(111);
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

// init event handlers
//
//
/**
if(window.console) { console.log((window.addEventListener));
        console.log(typeof(window.attachEvent));
}

*/
if(typeof(window.addEventListener)  != "undefined") {
box.addEventListener("dragenter",dragEnter,false);
box.addEventListener("dragexit",dragExit,false);
box.addEventListener("dragover",dragOver,false);
box.addEventListener("drop",drop,false);
}

function dragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}
function dragExit(evt) {
     evt.stopPropagation();
    evt.preventDefault();

}
function dragOver(evt) {
     evt.stopPropagation();
    evt.preventDefault();


}

function drop (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var count = files.length;

    // Only call the handler if 1 or more files was dropped.
    if (count > 0)
        handleFiles(files);
}

function handleFiles(files){
var file = files[0];
 
document.getElementById("droplabel").innerHTML = "Processing " + file.name;
 
var reader = new FileReader();
 
// init the reader event handlers
reader.onloadend = handleReaderLoadEnd;
 
// begin the read operation
reader.readAsDataURL(file);

}


function handleReaderLoadEnd(evt) {
  if(window.console) console.log(evt.target.result);
 // var img = document.getElementById("preview");
    var img = new Image();
  
  img.src = evt.target.result;
  box.appendChild(img);
}
