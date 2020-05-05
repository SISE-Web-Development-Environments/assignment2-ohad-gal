var users_array = new Array();


function checkIfExist(username){
   for(var i=0; i<users_array.length; i=i+2){
      if (users_array[i] == username.value){
         return false;
      }
   }
   return true;
}

function checkLogin(username,password){
   for(var i=0; i<users_array.length; i=i+2){
      if (users_array[i] == username.value && users_array[i+1] == password.value){
         return true;
      }
   }
   return false;
}

$(function () {

   var p = 'p';
   users_array.push(p);
   users_array.push(p);
    $("#username_error_message").hide();
    $("#fullname_error_message").hide();
    $("#password_error_message").hide();
    $("#retype_password_error_message").hide();
    $("#email_error_message").hide();
    $("#birth_date_error_message").hide();

    var error_username = false;
    var error_fullname = false;
    var error_password = false;
    var error_retype_password = false;
    var error_email = false;
    var error_birthday = false;

    $("#form_username").focusout(function () {
       check_username();
    });
    $("#form_fullname").focusout(function () {
       check_fullname();
    });
    $("#form_password").focusout(function () {
       check_password();
    });
    $("#form_retype_password").focusout(function () {
       check_retype_password();
    });
    $("#form_email").focusout(function () {
       check_email();
    });

    $("#form_birth_date").focusout(function () {
      check_birthday();
   });

    function check_username() {
       var username = $("#form_username").val();
       var username_length = $("#form_username").val().length;
       if (username_length > 3 && username !== '') {
          $("#username_error_message").hide();
          $("#form_username").css("border-bottom", "2px solid #34F458");
       } else {
          $("#username_error_message").html("Should contain at least 4 letters");
          $("#username_error_message").show();
          $("#form_username").css("border-bottom", "2px solid #F90A0A");
          error_username = true;
       }
    }

    function check_fullname() {
       var pattern = /^[a-zA-Z]*$/; //only letters regex.
       var sname = $("#form_fullname").val()
       if (pattern.test(sname) && sname !== '') {
          $("#fullname_error_message").hide();
          $("#form_fullname").css("border-bottom", "2px solid #34F458");
       } else {
          $("#fullname_error_message").html("Should contain only Characters");
          $("#fullname_error_message").show();
          $("#form_fullname").css("border-bottom", "2px solid #F90A0A");
          error_fullname = true;
       }
    }

    function check_password() {
       var password_length = $("#form_password").val().length;
       if (password_length < 6) {
          $("#password_error_message").html("Atleast 6 Characters");
          $("#password_error_message").show();
          $("#form_password").css("border-bottom", "2px solid #F90A0A");
          error_password = true;
       } else {
          $("#password_error_message").hide();
          $("#form_password").css("border-bottom", "2px solid #34F458");
       }
    }

    function check_retype_password() {
       var password = $("#form_password").val();
       var retype_password = $("#form_retype_password").val();
       if (password !== retype_password) {
          $("#retype_password_error_message").html("Passwords Did not Matched");
          $("#retype_password_error_message").show();
          $("#form_retype_password").css("border-bottom", "2px solid #F90A0A");
          error_retype_password = true;
       } else {
          $("#retype_password_error_message").hide();
          $("#form_retype_password").css("border-bottom", "2px solid #34F458");
       }
    }

    function check_email() {
       var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; //valid e-mail pattern.
       var email = $("#form_email").val();
       if (pattern.test(email) && email !== '') {
          $("#email_error_message").hide();
          $("#form_email").css("border-bottom", "2px solid #34F458");
       } else {
          $("#email_error_message").html("Invalid Email pattern");
          $("#email_error_message").show();
          $("#form_email").css("border-bottom", "2px solid #F90A0A");
          error_email = true;
       }
    }


    function check_birthday() {
      var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; //valid e-mail pattern.
      var email = $("#form_email").val();
      if (pattern.test(email) && email !== '') {
         $("#email_error_message").hide();
         $("#form_email").css("border-bottom", "2px solid #34F458");
      } else {
         $("#email_error_message").html("Invalid Email pattern");
         $("#email_error_message").show();
         $("#form_email").css("border-bottom", "2px solid #F90A0A");
         error_email = true;
      }
   }

    $("#registration_form").submit(function () {
       error_username = false;
       error_fullname = false;
       error_password = false;
       error_retype_password = false;
       error_email = false;
       error_birthday= false;

       check_username();
       check_fullname();
       check_password();
       check_retype_password();
       check_email();
       check_birthday();

       if (error_username === false && error_fullname === false && error_email === false && error_password === false && error_retype_password === false) {
          var username = document.getElementById("form_username");
          var pass = document.getElementById("form_password");
          if (checkIfExist(username)) {
            users_array.push(username.value);
            users_array.push(pass.value);
            alert("Registration Successfull!");
            return false;
          }
          else {
             alert("User Name is already exist");
             return false;
          }
       }
       else {
          alert("Please Fill the form Correctly");
          return false;
       }
    });


    $("#login_form").submit(function () {
       error_username = false;
       error_password = false;

       check_username();
       check_password();

       if (username !== '' && pass !== '') {
          var username = document.getElementById("login_form_username");
          var pass = document.getElementById("login_form_password");
          if (checkIfExist(username)) {
             alert("User name does not exist in system");
             return false;
          }
          if (checkLogin(username,pass) == true) {
             alert("Login succesfully to " + username.value + " account");
             var user_input = document.getElementById("user_input");
             user_input.value = username.value;
             loginSuccessfully();
             return false;
          }
          else {
             alert("Incorrect password");
             return false;
          }
       }
       else {
          alert("Please Fill the form Correctly");
          return false;
       }
    });

 });