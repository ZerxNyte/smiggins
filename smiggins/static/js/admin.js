let inc = 0, req = 0;
let home = true;


showlog = (str, time=3000) => {
  inc++;
  dom("error").innerText = str;
  setTimeout(() => { req++; if (req == inc) { dom("error").innerText = ""; }}, time);
};


dom("post-delete").addEventListener("click", function() {
  fetch(`/api/${dom("comment-toggle").checked ? "comment" : "post"}`, {
    method: "DELETE",
    body: JSON.stringify({
      "id": Number(dom("post-id").value)
    })
  }).then((response) => (response.json()))
    .then((json) => {
      if (!json.success) {
        showlog("I DONT THINK THAT WORKED MAYBE HITTING YOUR PC WILL HELP")
      }
    });
});


