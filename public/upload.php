<?php
$path = dirname(__DIR__);
$target_dir = $path . "/shopnew/uploads/";
$resullt = [];
$msg = NULL;
foreach ($_FILES as $file) {
  $fileNameSplit = explode('.', $file["name"]);
  $fileFormat = end($fileNameSplit);
  // $target_file = $target_dir . basename($file["name"]);
  $target_file = $target_dir . bin2hex(random_bytes(20)) . '.' . $fileFormat;
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
  $check = getimagesize($file["tmp_name"]);
  if (file_exists($target_file)) {
    $msg = "Sorry, file already exists.";
    $uploadOk = 0;
  }
  if ($file["size"] > 10000000) {
    $msg = "Sorry, your file is too large.";
    $uploadOk = 0;
  }
  if ($uploadOk == 0) {
    $msg .= "# Sorry, your file was not uploaded.";
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => $msg)));
  } else {
    if (move_uploaded_file($file["tmp_name"], $target_file)) {
      $result = array(
        'fileName' => basename($target_file),
        'fieldId' => $_SERVER['HTTP_PRODUCT_INPUT_FIELD_ID'],
        'itemId' => $_SERVER['HTTP_VARIATION_INDEX'],
        'uploaded' => true,
      );
    }
  }
}
echo json_encode($result, JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
