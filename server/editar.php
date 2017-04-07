<?php
  $mysqli = new mysqli("localhost", "root", "12345678", "lab-bootcamp");

  if ($mysqli->connect_errno) {
    printf("Falló la conexión: %s\n", $mysqli->connect_error);
    exit();
  }

  $query = "UPDATE 
              authors 
            SET 
              first_name='".$_POST['first_name']."', 
              last_name='".$_POST['last_name']."', 
              bio='".$_POST['bio']."' 
            WHERE 
              id=".$_POST['id']."";

  if ($mysqli->query($query)) {
    $query = "SELECT 
                * 
              FROM 
                authors 
              ORDER BY 
                id ASC";

    if ($result = $mysqli->query($query)) {
      while($row = $result->fetch_array(MYSQLI_ASSOC)){
        $authors[] = $row;
      }
      echo json_encode($authors);
    }else{
      echo json_encode($mysqli->error);
    }
  }else{
    echo json_encode($mysqli->error);
  }

   $mysqli->close();
?>