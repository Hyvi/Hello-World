<?php 
//  file_put_contents("/tmp/upload.log",json_encode($_REQUEST).json_encode($_FILES)."\n",FILE_APPEND);
	file_put_contents("/tmp/upload.log",print_r($_SERVER,true).print_r($_REQUEST,true).print_r($_FILES,true)."\n",FILE_APPEND);
$num_files = count($_FILES["file"]["name"]);
$error_message[0] = "Unknown problem with upload.";
$error_message[1] = "Uploaded file too large (load_max_filesize).";
$error_message[2] = "Uploaded file too large (MAX_FILE_SIZE).";
$error_message[3] = "File was only partially uploaded.";
$error_message[4] = "Choose a file to upload.";

for($i=0;$i < $num_files;$i++) {

	$upload_file=$_FILES["file"];
    //	echo $upload_file["type"]."<br />";
    //	echo $upload_file["tmp_name"]."<br />";
    //  echo $upload_file["error"]."<br />";
	echo urldecode($upload_file["name"][$i])."<br />http://file.gliese.com/".$upload_file["name"][$i]."<br />";
	$size = $upload_file["size"][$i]/1024;
	printf("%.2f kb <br />",$size); 
	// number_format($size,2,",","");
	if($upload_file["error"][$i]==0){
        if(!file_exists("/tmp/" . $upload_file["name"][$i]))
        {
            $success = move_uploaded_file($upload_file["tmp_name"][$i],"/tmp/" . basename(urldecode($upload_file["name"][$i])));
            if($success){
                echo "Uploaded, OK!<br />";
            }else
            {
                 print $error_message[$_FILES['file']['error'][$i]];
                 echo "Uploaded,FAILED";
            }
        }else{
            echo "File EXISTS";	
            echo "<a href=\"http://php.gliese.com/php/upload/delete_file.php?target_name=" . $upload_file["name"][$i] . "\" > DELETE?</a><br />";	
        }

    }else {
        print $error_message[$_FILES['file']['error'][$i]]; 
    }

}
/*
    //$headers = getallheaders();
$file = new stdClass;
$file->content = file_get_contents("php://input");
file_put_contents("/tmp/upload.log",$file->content."\n",FILE_APPEND);
echo $file->content;
echo $HTTP_RAW_POST_DATA; 
 */
?>
