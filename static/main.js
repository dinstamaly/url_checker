// https://docs.djangoproject.com/en/3.2/ref/csrf/#acquiring-the-token-if-csrf-use-sessions-and-csrf-cookie-httponly-are-false
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


function getAllUrls(url) {
  fetch(url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    }
  })
  .then(response => response.json())
  .then(data => {
    const urlList = document.getElementById("urlList");
    urlList.innerHTML = "";

    (data.context).forEach(url => {
      if (url.status === '200'){
        const urlHTMLElement = `
          <li>
            <p>ID: ${url.id}</p>
            <p>Url: ${url.url}</p>
            <p style="color: green">Status: ${url.status}</p>
          </li>`
        urlList.innerHTML += urlHTMLElement;
      }
      else {
        const urlHTMLElement = `
          <li>
            <p>ID: ${url.id}</p>
            <p>Url: ${url.url}</p>
            <p style="color: red">Status: ${url.status}</p>
          </li>`
        urlList.innerHTML += urlHTMLElement;
      }
    });
  });
}

function addUrl(url, payload) {
  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({payload: payload})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
}


function updateUrl(url) {
  fetch(url, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": getCookie("csrftoken"),
    }

  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

}
