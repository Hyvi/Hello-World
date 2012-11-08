<?php 
   // http://xxx.com/mock.php?name=css1&type=css&sleep=8
   $name = $_GET['name'];
   $type = $_GET['type'];
   $sleep = $_GET['sleep'];

   if($type == 'css'){
      // 读取css  path : ./../tutorial/css/$name.css

   }else if($type == 'js'){
      // js path: ./../tutorial/js/$name.js
   }else {
      $result = ['retcode'=>'000','retdes' => 'type必须为js或者css'];
      echo json_encode($result); 
   }
