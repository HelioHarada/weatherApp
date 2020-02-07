<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp < 20 ? 'cloud' : ''">
    <main>
      <input
        @keyup="getWeatherApi()"
        type="text"
        class="input-search"
        v-model="query"
        placeholder="Procurar..."
      />

      <div class="box-info" v-if="status != ''">
        <div class="location">
          <h1>{{weather.name}}, {{weather.sys.country}}</h1>
        </div>
        <div class="temp">
          <div class="graus">
            <h2> {{Math.round(weather.main.temp)}}°C</h2>
          </div>
          <div class="status">
            <h2>{{status}}</h2>
          </div>
        </div>
      </div>
      <!-- {{query}} -->
      <!-- {{weather.weather[0].main}} -->
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      api_key: "6a0911f55e69a10f13be6d19840f1632",
      url: "https://api.openweathermap.org/data/2.5/weather?q=",
      query: "",
      weather: {},
      status: ""
    };
  },
  methods: {
    async getWeatherApi() {
      console.log("ww")
      try {
        const res = await this.$http.get(
          this.url + this.query + "&units=metric&APPID=" + this.api_key
        );
        this.weather = res.body;
        this.translate(this.weather.weather[0].main);
        console.log(this.weather)
      } catch (error) {
        console.log(error);
      }
    },
    async translate(word) {
      try {
        const res = await axios.get(
          "https://api.mymemory.translated.net/get?q=" +
            word +
            "!&langpair=en|pt"
        );
        this.status = res.data.responseData.translatedText;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
}

#app {
  background-image: url("./assets/img/sun-bg.jpg");
  background-size: cover;
  background-position: top;
  transition: 0.4s ease-in-out;
}

#app.cloud{
  background-image: url('./assets/img/cloud-bg.jpg')
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

main .input-search {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 15px;
  appearance: none;
  outline: none;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: #313131;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
}

main .input-search:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
}

.box-info {
  padding: 15px;
  margin-top: 30%;
  border-radius: 16px;
  background-color: rgba(240, 240, 240, 0.15)
}

.box-info .location {
  text-align: center;
  font-size: 24px;
  font-weight: 900;
  color: aliceblue;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.box-info .temp {
  text-align: center;

}

.box-info .temp .graus {
  color: aliceblue;
  font-size: 42px;
  font-weight: 900;
  text-shadow: 1px 4px rgba(0, 0, 0, 0.25);

 padding: 20px 0px 20px 0px;
}

.box-info .temp .status {
  color: aliceblue;
  font-size: 24px;
  text-shadow: 1px 4px rgba(0, 0, 0, 0.25);
}
</style>
