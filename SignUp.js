var capitalize;

$(document).ready(function() {
  return $("#signup").click(function(event) {
    var check, details;
    event.preventDefault();
    details = {
      queue: "USER",
      method: "register",
      username: $("input[name=username-signup]").val(),
      password: $("input[name=password-signup]").val(),
      email: $("input[name=email-signup]").val(),
      name: capitalize($("input[name=name-signup]").val())
    };
    check = true;
    $.each(details, function(key, value) {
      if ((value === null) || (value === "")) {
        noty({
          text: "" + (capitalize(key)) + " Cannot be empty",
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
        check = false;
        return false;
      }
    });
    if (check) {
      return $.ajax({
        url: "http://localhost:8080",
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
          var login_details;
          login_details = {
            queue: "USER",
            method: "login",
            username: $("input[name=username-signup]").val(),
            password: $("input[name=password-signup]").val()
          };
          return $.ajax({
            url: "http://localhost:8080",
            type: "POST",
            datatype: "json",
            data: JSON.stringify(login_details),
            success: function(result) {
              noty({
                text: 'Signup successful! You will be redirected shortly',
                timeout: 1500,
                type: "success",
                theme: 'bootstrapTheme'
              });
              localStorage.session = result.user.session_id;
              return window.setTimeout(function() {
                return window.location.href = "LandingPage.html";
              }, 3000);
            },
            error: function(xhr, status, error) {
              return noty({
                text: 'An error occured, please try again',
                timeout: 2000,
                type: "error",
                theme: 'bootstrapTheme'
              });
            }
          });
        },
        error: function(xhr, status, error) {
          return noty({
            text: 'An error occured, please try again',
            timeout: 2000,
            type: "error",
            theme: 'bootstrapTheme'
          });
        }
      });
    }
  });
});

$(document).ready(function() {
  return $("#login").click(function(event) {
    var check, details;
    event.preventDefault();
    details = {
      queue: "USER",
      method: "login",
      username: $("input[name=username-login]").val(),
      password: $("input[name=password-login]").val()
    };
    check = true;
    $.each(details, function(key, value) {
      if ((value === null) || (value === "")) {
        noty({
          text: "" + (capitalize(key)) + " Cannot be empty",
          timeout: 2000,
          type: "error",
          theme: 'bootstrapTheme'
        });
        check = false;
        return false;
      }
    });
    if (check) {
      return $.ajax({
        url: "http://localhost:8080",
        type: "POST",
        datatype: "json",
        data: JSON.stringify(details),
        success: function(result) {
          localStorage.session = result.user.session_id;
          noty({
            text: 'Login successful! You will be redirected shortly',
            timeout: 1500,
            type: "success",
            theme: 'bootstrapTheme'
          });
          return window.setTimeout(function() {
            return window.location.href = "LandingPage.html";
          }, 3000);
        },
        error: function(xhr, status, error) {
          if (error.contains("username")) {
            return noty({
              text: 'Wrong Username',
              timeout: 2000,
              type: "error",
              theme: 'bootstrapTheme'
            });
          } else if (error.contains("Password")) {
            return noty({
              text: 'Wrong Password',
              timeout: 2000,
              type: "error",
              theme: 'bootstrapTheme'
            });
          } else {
            return noty({
              text: 'An error occured, please try again',
              timeout: 2000,
              type: "error",
              theme: 'bootstrapTheme'
            });
          }
        }
      });
    }
  });
});

$(document).ready(function() {
  $("input[name=email-signup]").keyup(function(event) {
    if ($("input[name=email-signup]").val().match(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\.[a-zA-Z]{2,4}$/)) {
      if (!$("#signup-email").hasClass("has-success")) {
        $("#signup-email").addClass("has-success");
      }
      return $("#signup-email").removeClass("has-error");
    } else {
      if (!$("#signup-email").hasClass("has-error")) {
        $("#signup-email").addClass("has-error");
      }
      return $("#signup-email").removeClass("has-success");
    }
  });
  $("input[name=username-login]").keyup(function(event) {
    if ($("input[name=username-login]").val().match(/^\w+$/)) {
      if (!$("#login-username").hasClass("has-success")) {
        $("#login-username").addClass("has-success");
      }
      return $("#login-username").removeClass("has-error");
    } else {
      if (!$("#login-username").hasClass("has-error")) {
        $("#login-username").addClass("has-error");
      }
      return $("#login-username").removeClass("has-success");
    }
  });
  $("input[name=username-signup]").keyup(function(event) {
    if ($("input[name=username-signup]").val().match(/^\w+$/)) {
      if (!$("#signup-username").hasClass("has-success")) {
        $("#signup-username").addClass("has-success");
      }
      return $("#signup-username").removeClass("has-error");
    } else {
      if (!$("#signup-username").hasClass("has-error")) {
        $("#signup-username").addClass("has-error");
      }
      return $("#signup-username").removeClass("has-success");
    }
  });
  return $("input[name=name-signup]").keyup(function(event) {
    if ($("input[name=username-signup]").val().match(/^\w+$/)) {
      if (!$("#signup-name").hasClass("has-success")) {
        $("#signup-name").addClass("has-success");
      }
      return $("#signup-name").removeClass("has-error");
    } else {
      if (!$("#signup-name").hasClass("has-error")) {
        $("#signup-name").addClass("has-error");
      }
      return $("#signup-name").removeClass("has-success");
    }
  });
});

capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
