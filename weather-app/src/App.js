import React, { Component } from "react";
import "./App.css";

class App extends Component {
  api_key = "cd84fd69761d8ed4ea0f5b7d4c7d8685";

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
        if (result.cod === 200) {
          document.getElementById("searching-city").innerHTML =
            "Result found for " + city;
        }
      });
  };

  render() {
    return (
      <div className="App">
        <input
          id="city"
          type="text"
          placeholder="Search a city..."
          onChange={this.changeHandler}
        />
        <p id="searching-city"></p>
      </div>
    );
  }
}

export default App;
