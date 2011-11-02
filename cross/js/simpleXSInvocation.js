
    var url = 'http://php.dbank.com/php/simpleXSInvocation.php';
    var invocationHistoryText;
    var invocation = null;
    function callOtherDomain(){
         invocation = createCORSRequest('POST', url);
        if(invocation)
        {    
            invocation.onreadystatechange = handler;
            invocation.send(); 
        }
        else
        {
            invocationHistoryText = "No Invocation TookPlace At All";
            var textNode = document.createTextNode(invocationHistoryText);
            var textDiv = document.getElementById("textDiv");
            textDiv.appendChild(textNode);
        }
        
    }
    function handler(evtXHR)
    {
        if (invocation.readyState == 4)
        {
                if (invocation.status == 200)
                {
                    var response = invocation.responseXML;
                    var invocationHistory = response.getElementsByTagName('invocationHistory').item(0).firstChild.data;
                    invocationHistoryText = document.createTextNode(invocationHistory);
                    var textDiv = document.getElementById("textDiv");
                    textDiv.appendChild(invocationHistoryText);
                    
                }
                else
                    alert("Invocation Errors Occured");
        }
        else
            dump("currently the application is at" + invocation.readyState);
    }

function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        if(method) 
            xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        if(method)
            xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

