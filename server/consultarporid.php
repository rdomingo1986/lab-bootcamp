<?php
  $mysqli = new mysqli("localhost", "root", "12345678", "lab-bootcamp");

  if ($mysqli->connect_errno) {
    printf("Falló la conexión: %s\n", $mysqli->connect_error);
    exit();
  }

  $query = "SELECT 
              * 
            FROM 
              authors 
            WHERE 
              id='".$_POST['id']."'";

  if ($result = $mysqli->query($query)) {
    echo json_encode($result->fetch_array(MYSQLI_ASSOC));
  }else{
    echo json_encode($mysqli->error);
  }

   $mysqli->close();
?>