<?php
file_put_contents("/tmp/delete.log",print_r($_REQUEST,true).print_r($_GET,true)."\n",FILE_APPEND);

$file_name =  $_GET["target_name"];

$file = "/tmp/" . $_GET["target_name"];
if(file_exists("/tmp/" . $_GET["target_name"])){
    if(unlink($file)) {
        echo "文件[$file_name]删除完毕...!";
    }else {
        echo "删除失败...!尝试修改文件权限删除...";
        if(chmod($file,0777)){
            unlink($file);
            echo "文件[$file_name]权限修改后删除完毕...";
        }else {
            echo "文件无法通过web方式删除，可能是ftp权限对此文件有所设置...";
        }
    }

}

?>
