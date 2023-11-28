<?PHP
  if(!empty($_FILES['uploaded_file']))
  {
    $path = "uploads/";
    $path = $path . basename( $_FILES['uploaded_file']['name']);

    if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $path)) {
      echo basename( $_FILES['uploaded_file']['name']);
    } else{
        echo "There was an error uploading the file, please try again!";
    }
  }
?>