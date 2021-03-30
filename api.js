var idImp = 0;

$( document ).ready(function() {  
  mostraTabella(); 
  mostraDati();
  aggiungiEmployees();
  rimuoviEmployees();
});

function bttInserDati() {
  $("#container").append('<div id="add-container"><input type="text" id="firstname" placeholder="nome" class="form-control w-25 m-2" required><input type="text" id="lastname" placeholder="cognome" class="form-control w-25 m-2" required><input type="email" id="email" placeholder="email" class="form-control w-25 m-2" required><input type="text" id="phone" placeholder="telefono" class="form-control w-25 m-2" required><input type="button" class="btn btn-primary m-2" id="bttAggiungi" value="Aggiungi"></div>');
}
 
function mostraTabella () {
  $("#container").append('<table id="table"><tr><th colspan="3">GESTIONE IMPIEGATI</th><th colspan="2"><button class="btn btn-primary" onclick="bttInserDati()">Aggiungi Impiegato</button></th></tr><tr><td><b>Nome</b></td><td><b>Cognome</b></td><td><b>Email</b></td><td><b>Telefono</b></td><td></td></tr></table>');
}

function mostraDati(){
  $.ajax({
      url: 'http://localhost:8080/api/tutorial/1.0/employees',
      type: 'get',
      contentType: 'application/json',
      accept: "*/*",
      success: function(data){
        for (let i = 0; i < data.length; i++) { 
          idImp += 1;
          $('#table').append("<tr><td>" + data[i]["firstName"] + "</td><td>"+ data[i]["lastName"] + "</td><td>" + data[i]["email"] + "</td><td>"+ data[i]["phone"] + "</td><td><input type='button' class=\"btn btn-primary bttRimuovi\" id=\"" + data[i]["employeeId"] + "\" value='Rimuovi'></tr>");    
        } 
      },
      error: function(errorThrown){
        console.log( errorThrown );
      }
  });
}

function aggiungiEmployees(){
  $(document).on('click', '#bttAggiungi', function() {
    var employee = {
      "employeeId" : idImp + 1,
      "firstName" : $("#firstname").val(),
      "lastName" : $("#lastname").val(),
      "email" : $("#email").val(),
      "phone" : $("#phone").val(),
    };
    $.ajax({
      url: 'http://localhost:8080/api/tutorial/1.0/employees',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(employee),
      accept: '*/*',
      success: function(){
        alert("Impiegato inserito");
        location.reload();
      },
      error: function(errorThrown){
        console.log(errorThrown);
      }
    });
  });
}

function rimuoviEmployees() {
  $(document).on('click', '.bttRimuovi', function() {  
      var id = this.id;
      $.ajax({
        url: 'http://localhost:8080/api/tutorial/1.0/employees/' + id,
        type: 'delete',
        contentType: 'application/json',
        accept: "*/*",
        success: function(){
          alert('Impiegato rimosso');
          location.reload();
        },
        error: function(errorThrown){
          console.log(errorThrown);
        }
      });
  }); 
}