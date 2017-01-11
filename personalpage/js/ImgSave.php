<?php
$data = $_POST['base64'];
$id = $_POST['id'];
$dir = $_POST['dir'];
$type = $_POST['type'];
$data = str_replace("data:image/png;base64,",'',$data);
$data = base64_decode($data);
if ($dir != '') {
		file_put_contents('../..'.$dir, $data);
}else{
	if ($type == 0) {
		$seed = $id.'_'.uniqid().'.png';
		file_put_contents('../../user/avatar/'.$seed, $data);
		$dir = '/user/avatar/'.$seed;
	}else {
		$seed = $id.'_'.uniqid().'.png';
		file_put_contents('../../user/bg/'.$seed, $data);
		$dir = '/user/bg/'.$seed;
	}

}
echo json_encode($dir);
?>
