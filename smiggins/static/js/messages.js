// Handle:
// - Listing
// - Load more button
// - Displaying

let home = true;
let offset = -1;
let count = 0;

showlog = (string, timer=3000) => {
  dom("error").innerText = string;
  count++;

  setTimeout(() => {
    --count;
    if (!count) {
      dom("error").innerHTML = "";
    }
  }, timer);
};

function refresh(from_start=false) {
  if (from_start) {
    offset = -1;
    dom("recent-list").innerHTML = "";
  } else {
    offset++;
    if (!offset) {
      offset++;
    }
  }

  fetch(`/api/messages/list?offset=${offset}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {
        x = document.createDocumentFragment();
        for (const message of json.messages) {
          console.log(message);
          y = document.createElement("div");
          y.innerHTML += `
            <div class="post" data-color="${message.unread ? "" : "gray"}">
              <div class="upper-content">
                <a href="/u/${message.username}" class="no-underline text">
                  <div class="displ-name">
                    ${escapeHTML(message.display_name)}
                    <span class="upper-lower-opacity"> -
                      <div class="username">@${message.username}</div>
                      ${message.timestamp || message.content ? `- <div class="username">${timeSince(message.timestamp)} ago</div>` : ""}
                    </span>
                  </div>
                </a>
              </div>

              <div class="main-content">
                <a href="/m/${message.username}" class="no-underline text">
                  ${message.timestamp || message.content ? escapeHTML(message.content) : "<i>No messages sent</i>"}
                </a>
              </div>
            </div><br>`;
          x.append(y);
        }
        dom("recent-list").append(x);

        if (json.more) {
          dom("more").removeAttribute("hidden");
        } else {
          dom("more").setAttribute("hidden", "");
        }
      }
    })
    .catch((err) => {
      showlog("Something went wrong loading recent messages! " + err);
    });
}

refresh(true);
