$(document).ready(function(){
	// create iframe with name ;
	var frameName  = 'myFrame';
	//var $iframe = ("<iframe src=\"iframe_name_iframe_ie.html\" />")
	//				.attr("name",frameName)
	//				.appendTo("body");	
	var  createIframeForAllBrowser = function (frameName) { 
		var ifr = (/MSIE (6|7|8)/).test(navigator.userAgent) ? 
		document.createElement('<iframe name="'+frameName+'"/>'):
		document.createElement("iframe"); 
		ifr.name  = frameName;
		// The empty src="" won’t work, because it actually means to load the URL referenced by “”, that is the current page.
		// doesn't reproduce
		// To create an empty iframe which works well on IE HTTPs, one should use src="JavaScript:''" syntax.
		// http://javascript.info/tutorial/frames-and-iframes
		//ifr.src = "javacript:void()";
		ifr.src = "https://s.gliese.com/iebug/iframe_name_iframe_ie.html";
		return ifr;
	}
	var ifr_ = createIframeForAllBrowser(frameName);
	document.body.appendChild(ifr_);

	window.console && console.log("11111111");


	//setTimeout(function(){
	//	var iframes = document.getElementsByTagName('iframe');
	//	alert( iframes[0].getAttribute('name'));		
	//},2000);
});

