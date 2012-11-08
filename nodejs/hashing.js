// http://www.cnblogs.com/mingcn/archive/2010/10/18/GreatData.html 
// hashing
// 海量日志数据，提取出某日访问百度次数最多的那个IP。
// IP的数目还是有限的，最多2^32个，所以可以考虑使用hash将ip直接存入内存，然后进行统计。
// file : /usr/local/NSP/var/log/nginx/access.log
// 1，读取文件， 将读取的ip 
/*global require:true */
var fs = require('fs');
var os = require('os');
var path  =  "/usr/local/NSP/var/log/nginx/access.log";

console.time('readbigfile');
fs.readFile(path,'utf-8',function(err,data){
    if(err){
      return console.log(err);
    }
    console.timeEnd('readbigfile');
    console.log(data);
});

