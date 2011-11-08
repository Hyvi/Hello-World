<?php 
//  file_put_contents("/tmp/upload.log",json_encode($_REQUEST).json_encode($_FILES)."\n",FILE_APPEND);
	file_put_contents("/tmp/upload.log",print_r($_SERVER,true).print_r($_REQUEST,true).print_r($_FILES,true)."\n",FILE_APPEND);


	$upload_file=$_FILES["file"];
	echo $upload_file["type"]."<br />";
	echo urldecode($upload_file["name"])."<br />";
	echo $upload_file["tmp_name"]."<br />";
	$size = $upload_file["size"]/1024;
	printf("%.2f kb <br />",$size); 
	// number_format($size,2,",","");
	echo $upload_file["error"]."<br />";
	if($upload_file["error"]==0){
        if(!file_exists("/tmp/" . $upload_file["name"]))
        {
            $success = move_uploaded_file($upload_file["tmp_name"],"/tmp/" . basename(urldecode($upload_file["name"])));
            if($success){
                echo "Uploaded, OK!";
            }else
            {
                echo "Uploaded,FAILED";
            }
        }else{
            echo "File EXISTS";	
            echo "<a href=\"delete_file.php?target_name=" . $upload_file["name"] . "\" > DELETE?</a>";	
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
