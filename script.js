const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const Tcont = document.querySelector(".table-container");

// https://python3-dot-parul-arena-2.appspot.com/test?cityname=London

search.addEventListener("click", () => {
  const city = document.querySelector(".input-box").value;

  if (city === "") {
    Tcont.style.display = "none";
    table.style.display = "none";
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aed6395f91733bf120528bafcbda5df3`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        container.style.height = "550px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "flex";
        error404.classList.add("fadeIn");
        return;
      }
      weatherBox.style.display = "block";
      weatherDetails.style.display = "flex";
      error404.style.display = "none";
      error404.classList.remove("fadeIn");
      //
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".Hdata");
      const wind = document.querySelector(".Wdata");
      const cityN = document.querySelector(".cityName");

      //
      temperature.innerHTML = `${Math.round(data.main.temp - 273)}<span>°C`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}`;
      wind.innerHTML = `${data.wind.speed}`;
      cityN.innerHTML = `${data.name}`;

      weatherDetails.style.display = "flex";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "490px";

      var deets = [];

      var tempdeets = Math.round(data.main.temp - 273);
      var descdeets = data.weather[0].description;
      var humiditydeets = data.main.humidity;
      var winddeets = data.wind.speed;
      var namedeets = data.name;

      var deet = {
        Name: namedeets,
        Description: descdeets,
        Temperature: tempdeets,
        Humidity: humiditydeets,
        Wind: winddeets,
      };
      deets.push(deet);
      displayWeather();

      function displayWeather() {
        var table = document.getElementById("Table");
        var TableR = document.querySelector("Table tr");
        // table.innerHTML =
        //   "<tr><th>Name</th><th>Description</th><th>Temperature</th><th>Humidity</th><th>Wind</th><th>Action</th></tr>";

        for (var i = 0; i < deets.length; i++) {
          var row = table.insertRow(i + 1);
          var NameCell = row.insertCell(0);
          var DescCell = row.insertCell(1);
          var TempCell = row.insertCell(2);
          var HumidCell = row.insertCell(3);
          var WindCell = row.insertCell(4);
          //var ActionCell = row.insertCell(5);
          TableR.style.transition = "0.5s ease";

          NameCell.innerHTML = deets[i].Name;
          DescCell.innerHTML = deets[i].Description;
          TempCell.innerHTML = deets[i].Temperature;
          HumidCell.innerHTML = deets[i].Humidity;
          WindCell.innerHTML = deets[i].Wind;
          // ActionCell.innerHTML =
          //   "<button type='button' onclick='deleteWeather(" +
          //   i +
          //   ")'>Delete</button>";
        }
      }
      function deleteWeather(index) {
        deets.splice(index, 1);
        displayWeather();
      }
    });
});
