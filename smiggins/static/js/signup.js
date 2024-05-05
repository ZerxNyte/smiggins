let inc = 0, req = 0;

showlog = (str, time=3000) => {
  inc++;
  dom("error").innerText = str;
  setTimeout(() => { req++; if (req == inc) { dom("error").innerText = ""; }}, time);
};

dom("toggle-password").addEventListener("click", function() {
  if (dom("password").getAttribute("type") == "password") {
    dom("password").setAttribute("type", "text");
    dom("confirm").setAttribute("type", "text");
  } else {
    dom("password").setAttribute("type", "password");
    dom("confirm").setAttribute("type", "password");
  }
});

dom("submit").addEventListener("click", function() {
  username = dom("username").value;
  password = sha256(dom("password").value)

  if (password !== sha256(dom("confirm").value)) {
    showlog("Passwords don't match!");
    return;
  }

  this.setAttribute("disabled", "");
  fetch("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "username": username,
      "password": password
    })
  })
    .then((response) => {
      if (response.status == 429) {
        dom("post").removeAttribute("disabled");
        dom("post-text").removeAttribute("disabled");
        showlog("You are being ratelimited! Try again in a few moments...");
      } else {
        response.json().then((json) => {
          if (json.valid) {
            setCookie("token", json.token);
            window.location.href = "/home";
          } else {
            dom("submit").removeAttribute("disabled");
            showlog(`Unable to create account! Reason: ${json.reason}`);
          }
        })
      }
    })
    .catch((err) => {
      dom("submit").removeAttribute("disabled");
      showlog("Something went wrong! Try again in a few moments...");
      throw(err);
    });
});

dom("username").addEventListener("keydown", function(event) {
  if (event.key == "Enter" || event.keyCode == 18) {
    dom("password").focus();
  }
});

dom("password").addEventListener("keydown", function(event) {
  if (event.key == "Enter" || event.keyCode == 18) {
    dom("confirm").focus();
  }
});

dom("confirm").addEventListener("keydown", function(event) {
  if (event.key == "Enter" || event.keyCode == 18) {
    dom("submit").focus();
    dom("submit").click();
  }
});
