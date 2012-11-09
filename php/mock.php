<?php 
   // http://xxx.com/mock.php?name=css1&type=css&sleep=8
   $name = $_GET['name'];
   $type = $_GET['type'];
   $sleep = $_GET['sleep'];

   if(isset($sleep)){
      sleep($sleep);
   }
   if($type == 'css'){
      // 读取css  path : ./../tutorial/css/$name.css
      header('Content-Type:text/css');
      echo get_string_from_file('./../tutorial/css/'.$name.'.css');
   }else if($type == 'js'){
      // js path: ./../tutorial/js/$name.js
      header('Content-Type:application/javascript');
      readfile('./../tutorial/js/'.$name.'.js');
   }else {
      $result = array('retcode'=>'000','retdes' => 'type必须为js或者css');
      echo json_encode($result); 
   }

   // 读取文件内容
   function get_string_from_file($file_path){
      $handle = fopen($file_path,'r');
      $str = fread($handle,filesize($file_path));
      fclose($handle);
      return $str;
   }
