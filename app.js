var token = config.APIkey;
let loc_h1 = document.getElementById("location-h1");
let loc_img = document.getElementById("location-img");
let deg_h1 = document.getElementById("degree-h1");
let deg_span = document.getElementById("degree-span");
let desc = document.getElementById("description");
let temp = document.querySelector(".temperature");
let rand = document.getElementById("rand");
let home = document.getElementById("home");
let obj = {};

window.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${token}&q=${lat},${long}`
      )
        .then((response) => response.json())
        .then((data) => {
          loc_h1.innerText = `${data.location.name}, ${data.location.region}`;
          deg_h1.innerText = `${data.current.temp_f.toFixed(1)}`;
          deg_span.innerText = `F`;
          desc.innerText = `${data.current.condition.text}`;
          loc_img.src = `${data.current.condition.icon}`;
          obj = {
            ...obj,
            lH1: loc_h1.innerText,
            lImg: loc_img.src,
            deg: deg_h1.innerText,
            degS: deg_span.innerText,
            des: desc.innerText,
          };
        })
        .catch((error) => {
          console.error(error);
          loc_h1.innerText = `Mars, Solar System`;
          deg_h1.innerText = `-81`;
          deg_span.innerText = `F`;
          desc.innerText = `Abandon All Hope Ye Who Enter Here`;
          loc_img.src =
            "https://www.iconarchive.com/download/i600/3xhumed/mega-games-pack-26/Doom-1.ico";
          loc_img.style.width = "200px";
          obj = {
            ...obj,
            lH1: loc_h1.innerText,
            lImg: loc_img.src,
            deg: deg_h1.innerText,
            degS: deg_span.innerText,
            des: desc.innerText,
          };
          alert(
            "Location 404: Either there's a server issue or you're off Earth"
          );
        });
    });
  }
});

temp.onclick = function () {
  if (deg_span.innerText === "F") {
    deg_span.innerText = "C";
    let f = deg_h1.innerText;
    deg_h1.innerText = ((f - 32) * (5 / 9)).toFixed(1);
  } else {
    deg_span.innerText = "F";
    let c = deg_h1.innerText;
    deg_h1.innerText = (c * (9 / 5) + 32).toFixed(1);
  }
};

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function randomCords() {
  let lat = getRandomInRange(-180, 180, 3);
  let long = getRandomInRange(-180, 180, 3);

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${token}&q=${lat},${long}`
  )
    .then((response) => response.json())
    .then((data) => {
      loc_h1.innerText = `${data.location.name}, ${data.location.country}`;
      deg_h1.innerText = `${data.current.temp_f.toFixed(1)}`;
      deg_span.innerText = `F`;
      desc.innerText = `${data.current.condition.text}`;
      loc_img.src = `${data.current.condition.icon}`;
    })
    .catch((error) => {
      console.error(
        "Ocean man take me by the hand Lead me to the land that you understand"
      );
      randomCords(); //recall until random cords return working location
    });
}

rand.addEventListener("click", randomCords); //random location button
home.addEventListener("click", () => {
  //instead of refetching, re-displays stored data from when session was initiated
  loc_h1.innerText = obj.lH1;
  deg_h1.innerText = obj.deg;
  deg_span.innerText = obj.degS;
  desc.innerText = obj.des;
  loc_img.src = obj.lImg;
});
