const api_url = "https://api.wheretheiss.at/v1/satellites/25544"

// ----- Using Promises ------ //

fetch(api_url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const { longitude, latitude } = data;
    console.log(longitude, latitude);
  })
  .catch((err) => console.log(error));

// ---- Using ASYNC/AWAIT ----- //

async function getIssLocation() {
  const res = await fetch(api_url)
  const data = await res.json()
  console.log(data)
  const { longitude, latitude } = data
  console.log(longitude, latitude)
  document.querySelector("#long").textContent = longitude
  document.querySelector("#lat").textContent = latitude
}

getIssLocation();

// document.addEventListener("keypress", (ev) => {
//   console.log(ev.key);
// })
