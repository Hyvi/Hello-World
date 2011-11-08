gliese = {};
gliese.upload = {
    /**
     * files , binary from  
     */
    uploadFileForDrop : function(files){
                            var boundary = '------multipartformboundary' + (new Date).getTime();
                            var dashdash = '--';
                            var crlf     = '\r\n';

                            /* Build RFC2388 string. */
                            var builder = '';
                            builder += 'Content-Type: multipart/form-data; boundary='+boundary;
                            builder += crlf;
                            builder += crlf; 

                            builder += dashdash;
                            builder += boundary;
                            builder += crlf;

                            var i = 0 ;
                            var length  = files.length;
                            if(length == 1)
                                var name_val = "file";
                            else 
                                var name_var = "file[]";
                            var processFile = function(i,files) {
                                                           
                                var processEvt = function (evt){
                                    /* Generate headers. */            
                                    builder += 'Content-Disposition: form-data; name="'+name_val+'"';
                                    if (file.name) {
                                        /**
                                         * use encodeURI to  deal with the chinese word
                                         * in .php file , need to urldecode the file name 
                                         */ 
                                        builder += '; filename="' + encodeURI(file.name) + '"';
                                    }
                                    builder += crlf;

                                    builder += 'Content-Type: '+file.type;
                                    builder += crlf;
                                    builder += crlf; 

                                    /* Append binary data. */
                                    //builder += file.getAsBinary();
                                    //builder += reader.readAsBinaryString(file);
                                    builder += evt.target.result;
                                    builder += crlf;

                                    /* Write boundary. */
                                    if(i < (length -1)) {
                                        builder += dashdash;
                                        builder += boundary;
                                        builder += crlf;     
                                    }
                                    if( i < (length-1) ) processFile(++i,files);
                                    else {
                                        /* Mark end of the request. */
                                        builder += dashdash;
                                        builder += boundary;
                                        builder += dashdash;
                                        builder += crlf;

                                        var xhr = new XMLHttpRequest();
                                        xhr.open("POST","http://php.gliese.com/php/upload/upload_file.php",true);
                                       // xhr.setRequestHeader("content-type","multipart/form-data"); // echo $_REQUEST = []
                                        xhr.setRequestHeader("content-type","multipart/form-data; boundary="+boundary); // echo $_REQUEST != [] ;

                                       /**
                                        * workaroud for Chrome's sendAsBinary 
                                        * http://code.google.com/p/chromium/issues/detail?id=35705
                                        *
                                        */ 
                                        if(typeof xhr.sendAsBinary != "function") {
                                            XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
                                                if( typeof Uint8Array != "function" ) {
                                                    if(window.console) console.log("Your Browser isn't support Uint8Array");
                                                    return;
                                                }
                                                var ui8a = new Uint8Array(datastr.length);
                                                var i = 0;
                                                for(;i<datastr.length;i++) {
                                                    ui8a[i] = (datastr.charCodeAt(i) & 0xff);
                                                }
                                                this.send(ui8a.buffer);
                                            }
                                        }


                                        /**
                                         *  filename cann't be chinese otherwise encodeURI the chinese word;
                                         */ 
                                        
                                        xhr.sendAsBinary(builder); // keep old file encoding
                                        /**
                                         *  
                                         * 1)  in php file, need to exec " iconv -f utf-8 -t latin1 工作内容.xls -o 工作内容1.xls "
                                         * 2)  filename can be chinese
                                         */

                                        //xhr.send(builder);  // upload fileencoding  = utf-8

                                        xhr.onload = function (event) {
                                            if(xhr.responseText) {
                                                if(window.console) console.log(xhr.responseText);
                                            }
                                        };
//                                        var request =  $.ajax({
//                                            url:"http://php.gliese.com/php/upload/upload_file.php",
//                                            type:'POST',
//                                            data:builder,
//                                            beforeSend:function(xhr){
//                                                xhr.setRequestHeader("content-type",'multipart/form-data; boundary='+boundary);
//                                            }
//                                        });
//                                        request.done(function(msg){ 
//                                            if(window.console) console.log(msg);
//                                        });           
                                    }
                                }
                                var file = files[i];
                                var reader = new FileReader();
                                reader.onloadend = processEvt; 
                                //processEvt(reader);
                                reader.readAsBinaryString(file);
                                //var reader = new FileReaderSync(); 

                            }
                            
                            processFile(i,files);
                        } 
};

var dropbox = document.getElementById("dropbox");
if(dnd && dropbox){ 
    dnd.bindDragAndDrop(dropbox,gliese.upload.uploadFileForDrop);
}
