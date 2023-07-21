$(document).ready(function() {
    document.getElementById("username").innerText =
        localStorage.getItem("userEmail");




    $("#count").hide();
    var slCart = document.getElementById("count").innerText;
    localStorage.setItem("count", slCart);
    document.getElementById("slcart").innerText = slCart;

    var coursesId;
    var deleteForm = document.forms["delete-course-form"];
    $("#xoa").click(function(e) {
        e.preventDefault();
        coursesId = $(this).attr("data-id");
        console.log(coursesId);
    });

    $("#btnDeleteCourses").click(function(e) {
        deleteForm.action = "/cards/" + coursesId + "?_method=DELETE";
        deleteForm.submit();
    });

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    $("#btnLogin").click(function() {
        $.ajax({
                url: "/login",
                type: "POST",
                data: {
                    user: $("#user").val(),
                    password: $("#password").val(),
                },
            })
            .then((data) => {
                console.log(data.userid);
                localStorage.setItem("userid", data.userid);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("add", data.add);
                setCookie("token", data.token, 1);
                location.replace("https://f18b-1-53-210-204.ap.ngrok.io/home");
            })
            .catch((err) => {
                console.log(err);
            });
    });


    $("#footer").hide();

    $("#open").click(function() {
        document.getElementById("mySidenav").style.width = "15rem";
        document.getElementById("main").style.marginLeft = "250px";
    });

    $("#close").click(function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
    });

    $(".quanao").click(function() {
        var txt = this.innerText;
        $.ajax({
            type: "POST",
            url: "/collect",
            data: {
                type: txt,
            },
        });
    });

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    $("#out").click(function() {
        setCookie("token", "124xx345", 1);
        localStorage.clear();
    });


});