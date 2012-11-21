/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */
/**
 * for-in 循环，仅在 object/hash/map 时使用，绝不要对Array 使用
 *  https://github.com/windyrobin/iFrame/blob/master/style.md 
 *  http://stackoverflow.com/questions/242841/javascript-for-in-vs-for
 */ 


var array = ["a", "b", "c",  , undefined, null, 6];
for (var k in array) {
  console.log('...'+k);
}

console.log(array.length);
