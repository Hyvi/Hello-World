<?php
if(file_exists("/tmp/" . $_GET["target_name"])){
	unlink("/tmp/" . $_GET["target_name"]);
}

?>
