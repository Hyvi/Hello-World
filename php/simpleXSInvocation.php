<?php 
if($_SERVER['REQUEST_METHOD'] == "GET")
{
    header('Content-Type: text/plain');
    echo "This HTTP resource is designed to handle POSTed XML input from arunranga.com and not be retrieved with GET";
   
}
elseif($_SERVER['REQUEST_METHOD'] == "OPTIONS")
{
    // Tell the Client we support invocations from arunranga.com and that this preflight holds good for only 20 days
    if($_SERVER['HTTP_ORIGIN'] == "http://html5.gliese.com")
    {
    header('Access-Control-Allow-Origin: http://html5.gliese.com');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: X-PINGARUNER');
    header('Access-Control-Max-Age: 1728000');
    header("Content-Length: 0");
    header("Content-Type: application/xml");
    //header("Content-Type: text/plain");
    //exit(0);
    }
    else
    {
    header("HTTP/1.1 403 Access Forbidden");
    header("Content-Type: text/plain");
    echo "You cannot repeat this request";
   
    }
}
elseif($_SERVER['REQUEST_METHOD'] == "POST")
{
    /* Handle POST by first getting the XML POST blob, and then doing something to it, and then sending results to the client
    */
    if($_SERVER['HTTP_ORIGIN'] == "http://html5.gliese.com")
    {
            $postData = file_get_contents('php://input');
            $document = simplexml_load_string($postData);
            
            // do something with POST data

            $ping = $_SERVER['HTTP_X_PINGARUNER'];
           
                       
            header('Access-Control-Allow-Origin: http://html5.gliese.com');
            //header('Content-Type: text/plain');
            header('Content-Type: application/xml');
            echo file_get_contents("xmldata/simpleXSInvocation.xml") ;// some string response after processing
    }
    else
        die("POSTing Only Allowed from arunranga.com");
}
else
    die("No Other Methods Allowed");

?>
