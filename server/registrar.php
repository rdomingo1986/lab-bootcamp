<?php
  $mysqli = new mysqli("localhost", "root", "12345678", "lab-bootcamp");

  if ($mysqli->connect_errno) {
    printf("Falló la conexión: %s\n", $mysqli->connect_error);
    exit();
  }

  $query = "INSERT INTO 
              authors (id, first_name, last_name, bio) 
            VALUES 
              (NULL,'".$_POST['first_name']."','".$_POST['last_name']."','".$_POST['bio']."')";

  if ($mysqli->query($query)) {
    $_POST['id'] = $mysqli->insert_id;
    echo json_encode($_POST);
  }else{
    echo json_encode($mysqli->error);
  }

   $mysqli->close();
?>