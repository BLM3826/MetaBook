"use strict";

// eslint-disable-next-line no-undef
angular
  .module("myApp.view1", ["ngRoute"])

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/view1", {
        templateUrl: "view1/view1.html",
        controller: "View1Ctrl",
      });
    },
  ])

  .controller("View1Ctrl", [function () {}]);

// eslint-disable-next-line no-unused-vars
function login() {

    console.log("login button clicked");

    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: document.getElementById("lgnusername").value,
            // email: this.state.email,
            password: document.getElementById("lgnpassword").value,
        }),
    }).then((res) => {
            if (res.status === 200) {
                //redirect to view2.html
                window.location.href = "#!/view2";
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Error logging in please try again");
        });
}

// eslint-disable-next-line no-unused-vars
function register() {
    console.log("register button clicked");

    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: document.getElementById("rgsusername").value,
            // email: this.state.email,
            password: document.getElementById("rgspassword").value,
        }),
    }).then((res) => {
            if (res.status === 200) {
                //redirect to view2.html
                window.location.href = "#!/view2";
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Error registering please try again");
        });
}