/*global    Buffer:true */
// http://www.cnblogs.com/mingcn/archive/2010/10/18/GreatData.html 
// hashing
// 海量日志数据，提取出某日访问百度次数最多的那个IP。
// IP的数目还是有限的，最多2^32个，所以可以考虑使用hash将ip直接存入内存，然后进行统计。
// file : /usr/local/NSP/var/log/nginx/access.log
// 1，读取文件， 将读取的ip 
/*global require:true */
var fs = require('fs');
var os = require('os');
var linereader = require('line-reader');
var path  =  "/usr/local/NSP/var/log/nginx/access.log";
// out of memory 
/** 
    console.time('readbigfile');
    fs.readFile(path,'utf-8',function(err,data){
        if(err){
          return console.log(err);
        }
        console.timeEnd('readbigfile');
        console.log(data);
    });
**/

// use buffer 
/** 自己实现复杂了。
fs.open(path, 'r', function(err,fd){
   if(!err){
    // read  file
    // fs.read(fd, buffer, offset, length, position, [callback])
    var buffer = new Buffer(10);
    fs.read(fd, buffer, 0, 10, null, function(err, bytesRead, buffer){
        if(!err){ 
            console.log(buffer[8]);
        }
    });
   }else{
    return console.log(err);
   } 
});
**/

console.time('rdf');
var obj = {}; // 存储各种ip , key为ip,value为该ip出现的次数
     linereader.eachLine(path,function(line,last){
         //console.log(line.toString());
         var ip = line.toString().split(" ")[0];
         if(obj[ip]){
            obj[ip] = obj[ip]+1;
         }else{
             obj[ip] =1;
         }
         if(last){
             // 对obj里面的ip进行排序，找出最大值
             var maxip;
             var preMax = 0;
             for (var i in obj ){
                 if(obj.hasOwnProperty(i)){ 
                     if(obj[i] > preMax){
                         maxip = i;
                         preMax = obj[maxip];
                     }  
                 }
             }
             console.log(maxip);
             console.timeEnd('rdf');

         }
     });
    
