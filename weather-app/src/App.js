import React, { Component } from "react";
import "./App.css";

class App extends Component {
  api_key = "cd84fd69761d8ed4ea0f5b7d4c7d8685";

  state = {
    weather_object: {
      city: "",
      country: "",
      temperature: "",
      feels_like: "",
      weather: "Normal",
    },
  };

  changeHandler = () => {
    const city = document.getElementById("city").value;

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
          let feels_like = Math.floor(result.main.feels_like - 273.15);
          let weather = result.weather[0].main;
          let country = result.sys.country;

          let new_obj = {
            city: city,
            country: country,
            temperature: temperature,
            feels_like: feels_like,
            weather: weather,
          };

          this.setState({
            weather_object: new_obj,
          });
        } else {
          let new_obj = {
            city: "",
            country: "",
            temperature: "",
            feels_like: "",
            weather: "Normal",
          };

          this.setState({
            weather_object: new_obj,
          });
        }
      });
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

    return `${day}, ${month} ${date}`;
  };

  render() {
    let weather_object = this.state.weather_object;
    let info_box_classes = "info-box " + weather_object.weather;

    let return_object;
    if (weather_object.city === "") {
      return_object = (
        <div className={info_box_classes}>
          <div className="input-box">
            <input
              id="city"
              className="search-box"
              type="text"
              placeholder="Search a city..."
              onChange={this.changeHandler}
            />
          </div>

          <div className="no-result">No Result</div>
        </div>
      );
    } else {
      return_object = (
        <div className={info_box_classes}>
          <div className="input-box">
            <input
              id="city"
              className="search-box"
              type="text"
              placeholder="Search a city..."
              onChange={this.changeHandler}
            />
          </div>
          <div className="location-box">
            <div className="location">
              {weather_object.city}, {weather_object.country}
            </div>
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
            <div className="weather">{weather_object.weather}</div>
          </div>
        </div>
      );
    }

    return <div className="App">{return_object}</div>;
  }
}

export default App;
