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

const loginbtn = document.getElementById("loginbtn");

//form event listener
loginbtn.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            // email: this.state.email,
            password: document.getElementById("password").value,
        }),
    })
        .then((res) => {
            if (res.status === 200) {
                //redirect to view2.html
                window.location.href = "/view2";
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Error logging in please try again");
        });
});