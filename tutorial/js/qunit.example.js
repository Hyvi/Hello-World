/*global module:true, asyncTest:true, start:true,  expect:true, test:true, equal:true, ok:true, notEqual:true, deepEqual:true */
test('a basic test example',function(){
var value = 'hello';
equal(value,'hello',"We expect value to hello" );
});
test('a demo for globals check',function(){
    window.name = 'checks for globals';
    ok(1,'ok');
});
test('notrycatch',function(){
    throw 'Err1'; 
});
test('Asserting Results',function(){
    equal(NaN,NaN,'equal使用==比较');
    deepEqual( parseInt('abc',10), Math.sqrt(-1),'deepEqual能对NaN比较，使用isNaN判断');
});

module("Callbacks Group");
// Synchronous Callbacks
test( "a test", function() {
    expect( 2 );

    function calc( x, operation ) {
        return operation( x );
    }

    var result = calc( 2, function( x ) {
        ok( true, "calc() calls operation function" );
        return x * x;
    });

    equal( result, 4, "2 square equals 4" );
});


// Asynchronous Callbacks 
asyncTest( "asynchronous test: one second later!", function() {
    expect( 1 );

    setTimeout(function() {
        ok( true, "Passed and ready to resume!" );
        start();
    }, 1000);
});

module("Other Groups");
// Testing User Actions 
function KeyLogger( target ) {
    if ( !(this instanceof KeyLogger) ) {
        return new KeyLogger( target );
    }
    this.target = target;
    this.log = [];

    var self = this;

    this.target.off( "keydown" ).on( "keydown", function( event ) {
        self.log.push( event.keyCode );
    });
}
test( "keylogger api behavior", function() {
 
  var event,
      $doc = $( document ),
      keys = KeyLogger( $doc );
 
  // trigger event
  event = $.Event( "keydown" );
  event.keyCode = 9;
  $doc.trigger( event );
 
  // verify expected behavior
  equal( keys.log.length, 1, "a key was logged" );
  equal( keys.log[ 0 ], 9, "correct key was logged" );
 
});
// http://stackoverflow.com/questions/6976721/is-nan-equals-to-nan
// A NaN is never equal to itself, by definition. It works this way in any language. 
