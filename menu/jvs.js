
  let list = {};
  let cart = {};
  let idx;
  



function ajax(method, url, body, callback, rejectCallback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        if (typeof callback === "function") {
          callback(JSON.parse(this.responseText));
        }
      } else {
        if (typeof rejectCallback === "function") {
          rejectCallback(new Error("serverul a dat eroare"));
        }
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send(body);
};



function getList() {
  ajax("GET", "https://restaurant-80efb.firebaseio.com/dishes.json", undefined, function(answer) {
    list = answer;
    draw();
  })
};

function draw() {
  var str = "";
  for (var i in list) {
    if (!list.hasOwnProperty(i)) {
      continue;
    }
    if (list[i] === null) {
      continue;
    }

    str += `
    <div class="alignbox-big ">

      <div class="information"> <h5>${list[i].name} </h5></div>
      <div><p>${list[i].description}</p></div>
      <div class="details">
        <div><strong> Price: ${list[i].price} lei</strong></div>
       <button> See more </button>
      </div>
    </div>
  `;
  }

  document.querySelector("#dishesContainer").innerHTML = str;
}
