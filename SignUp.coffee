$(document).ready () ->
    $("#signup").click (event) ->
        event.preventDefault()
        details = {
            queue: "USER",
            method: "register",
            username: $("input[name=username-signup]").val(),
            password: $("input[name=password-signup]").val(),
            email: $("input[name=email-signup]").val(),
            name: capitalize($("input[name=name-signup]").val())
        }

        check = true
        $.each details, (key,value) ->
            if((value == null) || (value == ""))
                noty({text: "#{capitalize(key)} Cannot be empty", timeout: 2000, type:"error", theme: 'bootstrapTheme'})
                check = false
                return false

        if(check)
            $.ajax
                url: "http://localhost:8080",
                type: "POST",
                datatype: "json",
                data: JSON.stringify(details),
                success: (result) ->
                    login_details = {
                        queue: "USER",
                        method: "login",
                        username: $("input[name=username-signup]").val(),
                        password: $("input[name=password-signup]").val()
                    }

                    $.ajax
                        url: "http://localhost:8080",
                        type: "POST",
                        datatype: "json",
                        data: JSON.stringify(login_details),
                        success: (result) ->
                            noty({text: 'Signup successful! You will be redirected shortly', timeout: 1500, type:"success", theme: 'bootstrapTheme'})
                            localStorage.session = result.user.session_id
                            #redirect after 3 seconds
                            window.setTimeout(  ->
                                window.location.href = "LandingPage.html"
                            , 3000)

                        error: (xhr,status,error) ->
                            noty({text: 'An error occured, please try again', timeout: 2000, type:"error", theme: 'bootstrapTheme'})

                error: (xhr,status,error) ->
                    noty({text: 'An error occured, please try again', timeout: 2000, type:"error", theme: 'bootstrapTheme'})



$(document).ready () ->
    $("#login").click (event) ->
        event.preventDefault()
        details = {
            queue: "USER",
            method: "login",
            username: $("input[name=username-login]").val(),
            password: $("input[name=password-login]").val()
        }

        check = true
        $.each details, (key,value) ->
            if((value == null) || (value == ""))
                noty({text: "#{capitalize(key)} Cannot be empty", timeout: 2000, type:"error", theme: 'bootstrapTheme'})
                check = false
                return false

        if(check)
            $.ajax
                url: "http://localhost:8080",
                type: "POST",
                datatype: "json",
                data: JSON.stringify(details),
                success: (result) ->
                    localStorage.session = result.user.session_id
                    noty({text: 'Login successful! You will be redirected shortly', timeout: 1500, type:"success", theme: 'bootstrapTheme'})
                    window.setTimeout(  ->
                        window.location.href = "LandingPage.html"
                    , 3000)

                error: (xhr,status,error) ->
                    if error.contains "username"
                        noty({text: 'Wrong Username', timeout: 2000, type:"error", theme: 'bootstrapTheme'})
                    else if error.contains "Password"
                        noty({text: 'Wrong Password', timeout: 2000, type:"error", theme: 'bootstrapTheme'})
                    else
                        noty({text: 'An error occured, please try again', timeout: 2000, type:"error", theme: 'bootstrapTheme'})

#regular expression cerated to  validate form inputs when a keyboard button is released
$(document).ready () ->
    $("input[name=email-signup]").keyup (event) ->
        if($("input[name=email-signup]").val().match(///^[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\.[a-zA-Z]{2,4}$///))
            if(!$("#signup-email").hasClass("has-success"))
                $("#signup-email").addClass("has-success")

            $("#signup-email").removeClass("has-error")

        else
            if(!$("#signup-email").hasClass("has-error"))
                $("#signup-email").addClass("has-error")

            $("#signup-email").removeClass("has-success")

    $("input[name=username-login]").keyup (event) ->
        if($("input[name=username-login]").val().match(///^\w+$///))
            if(!$("#login-username").hasClass("has-success"))
                $("#login-username").addClass("has-success")

            $("#login-username").removeClass("has-error")

        else
            if(!$("#login-username").hasClass("has-error"))
                $("#login-username").addClass("has-error")

            $("#login-username").removeClass("has-success")

    $("input[name=username-signup]").keyup (event) ->
        if($("input[name=username-signup]").val().match(///^\w+$///))
            if(!$("#signup-username").hasClass("has-success"))
                $("#signup-username").addClass("has-success")

            $("#signup-username").removeClass("has-error")

        else
            if(!$("#signup-username").hasClass("has-error"))
                $("#signup-username").addClass("has-error")

            $("#signup-username").removeClass("has-success")

    $("input[name=name-signup]").keyup (event) ->
        if($("input[name=username-signup]").val().match(///^\w+$///))
            if(!$("#signup-name").hasClass("has-success"))
                $("#signup-name").addClass("has-success")

            $("#signup-name").removeClass("has-error")

        else
            if(!$("#signup-name").hasClass("has-error"))
                $("#signup-name").addClass("has-error")

            $("#signup-name").removeClass("has-success")

#The following method capitalizes the first letter in a word
capitalize = (string) ->
    return string.charAt(0).toUpperCase() + string.slice(1)
