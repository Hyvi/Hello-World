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

                            builder += dashdash;
                            builder += boundary;
                            builder += crlf;

                            var i = 0 ;
                            var length  = files.length;
                            if(length == 1)
                                var name_val = "file";
                            else 
                                var name_var = "file[]";
                            for(;i<length;i++) {
                                var file = files[i];

                                /* Generate headers. */            
                                builder += 'Content-Disposition: form-data; name="'+name_val+'"';
                                if (file.fileName) {
                                    builder += '; filename="' + file.fileName + '"';
                                }
                                builder += crlf;

                                builder += 'Content-Type: application/octet-stream';
                                builder += crlf;
                                builder += crlf; 

                                /* Append binary data. */
                                builder += file.getAsBinary();
                                builder += crlf;

                                /* Write boundary. */
                                builder += dashdash;
                                builder += boundary;
                                builder += crlf;     
                            
                            }
                            /* Mark end of the request. */
                            builder += dashdash;
                            builder += boundary;
                            builder += dashdash;
                            builder += crlf;
                            var request =  $.ajax({
                                url:"http://php.gliese.com/php/upload/upload_file.php",
                                type:'POST',
                                data:builder,
                                beforeSend:function(xhr){
                                    xhr.setRequestHeader("content-type",'multipart/form-data; boundary='+boundary);
                                }
                            });
                            request.done(function(msg){ 
                            if(window.console) console.log(msg);
                            });
                        } 
};

var dropbox = document.getElementById("dropbox");
bindDragAndDrop(dropbox,gliese.upload.uploadFileForDrop);
