$(document).on('ready', () => {
  //Llamada para cargar la tabla
  $.ajax({
    url: 'server/listar.php',
    method: 'GET',
    dataType: 'json',
    success: (response) => {
      var author;
      if(! (response === null)){
        $.each(response, (key,val) => {
          author = `
            <tr id="${val.id}">
              <td>${val.first_name}</td>
              <td>${val.last_name}</td>
              <td>${val.bio}</td>
              <td>
                <button type="button" class="btn btn-primary edit">Edit</button>
                <button type="button" class="btn btn-danger delete">Delete</button>
              </td>
            </tr>
          `;
          $('table tbody').append(author);
        });
      }
    }
  });

  //Registro o edición de datos
  $('#register_form').on('submit', (event) => {
    event.preventDefault();
    var data = $('#register_form').serializeArray();
    var $button = $('button[type="submit"]');
    if($button.attr('data-operation') === 'register'){
      $.ajax({
        url: 'server/registrar.php',
        method: 'POST',
        dataType: 'json',
        data: data,
        success: (response) => {
          var register = `
            <tr id="${response.id}">
              <td>${response.first_name}</td>
              <td>${response.last_name}</td>
              <td>${response.bio}</td>
              <td>
                <button type="button" class="btn btn-primary edit">Edit</button>
                <button type="button" class="btn btn-danger delete">Delete</button>
              </td>
            </tr>
          `;
          $('table tbody').append(register);
          alert('Registrado');
          $('button[type="reset"]').trigger('click');
        }
      });
    }else{
      data.push({name: "id", value: $button.attr('id')});
      $.ajax({
        url: 'server/editar.php',
        method: 'POST',
        dataType: 'json',
        data: data,
        success: (response) => {
          $('table tbody').empty()
          $.each(response, (key,val) => {
            author = `
              <tr id="${val.id}">
                <td>${val.first_name}</td>
                <td>${val.last_name}</td>
                <td>${val.bio}</td>
                <td>
                  <button type="button" class="btn btn-primary edit">Edit</button>
                  <button type="button" class="btn btn-danger delete">Delete</button>
                </td>
              </tr>
            `;
            $('table tbody').append(author);
          });
          $('button[type="reset"]').trigger('click');
          alert('Modificado');
        }
      });
    }
  });

  //Limpiar formulario
  $('button[type="reset"]').on('click', () => {
    $('button[type="submit"]').attr('data-operation','register');
    $('button[type="submit"]').removeAttr('id');
    $('button[type="submit"]').text('Save');
  });

  //Cargar datos al formulario para editar
  $('.table').on('click','.edit', (event) => {
    $('button[type="submit"]').attr('data-operation','edit');
    var id = $(event.currentTarget).parent().parent().attr('id');
    $.ajax({
      url: 'server/consultarporid.php',
      method: 'POST',
      dataType: 'json',
      data: {id: id},
      success: (response) => {
        if(response.first_name === undefined){
          alert('Error al consultar');
        }else{
          $('#first_name').val(response.first_name);
          $('#last_name').val(response.last_name);
          $('#bio').val(response.bio);
          $('button[type="submit"]').attr('data-operation','edit');
          $('button[type="submit"]').attr('id',response.id);
          $('button[type="submit"]').text('Edit');
        }
      }
    });
  });

  //Eliminar registro
  $('.table').on('click','.delete', (event) => {
    if (confirm("¿Desea eliminar el registro?")) {
      $('button[type="reset"]').trigger('click');
      var $parent = $(event.currentTarget).parent().parent();
      var id = $parent.attr('id');
      $.ajax({
        url: 'server/eliminarporid.php',
        method: 'POST',
        dataType: 'json',
        data: {id: id},
        success: (response) => {
          if(! (response === 'OK')){
            alert('Error al eliminar');
            console.log(response);
          }else{
            alert('Registro eliminado');
            $parent.remove();
          }
        }
      });
    }
  });
});