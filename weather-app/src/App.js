import React, { Component } from "react";
import "./App.css";

class App extends Component {
  api_key = "cd84fd69761d8ed4ea0f5b7d4c7d8685";

  state = {
    weather_object: {
      city: "",
      date_time: "",
      temperature: 29,
      feels_like: 33,
      weather: "",
    },
  };

  changeHandler = () => {
    const city = document.getElementById("city").value;
    if (city.length > 0) {
      document.getElementById("searching-city").innerHTML = "Searching " + city;
    } else {
      document.getElementById("searching-city").innerHTML = "";
    }

    var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      this.api_key;

    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.cod === 200) {
          let city = result.name;
          let temperature = Math.floor(result.main.temp - 273.15);

          document.getElementById("searching-city").innerHTML =
            "Result found for " + city;
        } else if (city.length > 0) {
          document.getElementById("searching-city").innerHTML =
            "No result for  " + city;
        } else {
          document.getElementById("searching-city").innerHTML = "";
        }
      });
    console.log(this.state);
  };

  dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  render() {
    let weather_object = this.state.weather_object;
    return (
      <div className="App">
        <div className="info-box">
          <div className="input-box">
            <input
              id="city"
              className="search-box"
              type="text"
              placeholder="Search a city..."
              onChange={this.changeHandler}
            />
            <p id="searching-city"></p>
          </div>
          <div className="location-box">
            <div className="location">Khulna</div>
            <div className="date-time">{this.dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {weather_object.temperature}
              <span>&#8451;</span>
            </div>
            <div className="feels-like">
              Feels like {weather_object.feels_like}
              <span>&#8451;</span>
            </div>
            <div className="weather">Sunny</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
