<template>
  <!-- <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp < 20 ? 'cloud' : ''"> -->
  <div id="app" :class="background == '' ? 'clouds' : background">
    <main>
      <div class="title">
        <h1 align="center">WeatherApp!</h1>
        <span class="sign">Develop by HaradaHelio</span>
      </div>

      <!-- input -->
      <div class="box-input">
        <input

          @keyup.enter="getWeatherApi()"
          type="text"
          class="input-search"
          v-model="query"
          placeholder="Procurar..."
        />
        <div class="box-button" @click="getWeatherApi()">
          <img src="src/assets/img/search.svg" alt="">
        </div>
      </div>
      <div class="box-info loading" v-if="loading">
        <img src="src/assets/img/loading.svg" alt="loading" />
      </div>
      <div class="box-info" v-if="status != '' && !loading">
        <div class="location">
          <h1>{{weather.name}}, {{weather.sys.country}}</h1>
        </div>
        <div class="temp">
          <div class="graus">
            <h2>{{Math.round(weather.main.temp)}}°C</h2>
          </div>
          <div class="status">
            <h2>{{status}}</h2>
            <div></div>
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
      status: "",
      background: "",
      loading: false
    };
  },
  methods: {
    async getWeatherApi() {
      try {
        this.loading = true;
        const res = await this.$http.get(
          this.url + this.query + "&units=metric&APPID=" + this.api_key
        );
        this.weather = res.body;
        this.translate(this.weather.weather[0].main);
        // console.log(this.weather)
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async translate(word) {
      console.log(word);
      try {
        this.loading = true;
        this.background = word.toLowerCase();
        if (word == "Mist") {
          this.status = "garoa";
        } else {
          const res = await axios.get(
            "https://api.mymemory.translated.net/get?q=" +
              word +
              "!&langpair=en|pt"
          );
          this.status = res.data.responseData.translatedText;
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
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
  /* background-image: url('./assets/img/cloud-bg.jpg'); */
  background-size: cover;
  transition: 0.4s ease-in-out;
  background-attachment: fixed;
  position: absolute;
  transition: 0.5s ease;
  width: 100%;
  height: 100vh;
  animation-name: loop;
  animation-duration: 80s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes loop {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}

main {
  min-height: 100vh;
  width: 100%;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
main .title {
  padding: 20px;
  color: aliceblue;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

main .box-input {
  display: flex;
}

main .box-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 40px;
  width: 15%;
  border-radius: 0px 25px 25px 0px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 15px;
}

main .box-button img{
  width: 24px;
}

main .input-search {
  width: 85%;
  height: 40px;
  margin-bottom: 20px;
  padding: 15px;
  appearance: none;
  outline: none;
  border: none;
  border-radius: 25px 0px 0px 25px;
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

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-info {
  padding: 15px;
  margin-top: 30%;
  border-radius: 16px;
  background-color: rgba(240, 240, 240, 0.15);
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

.clouds {
  background-image: url("./assets/img/cloud-bg.jpg");
}

.drizzle {
  background-image: url("./assets/img/rain.gif");
}
.mist {
  background-image: url("./assets/img/rain.gif");
}

.rain {
  background-image: url("./assets/img/rain.gif");
}

.clear {
  background-image: url("./assets/img/sun.jpg");
}

@media (min-width: 900px) {
  main {
    padding: 5% 25% 0% 25%;
  }
}

.sign {
  font-size: 8px;
  float: right;
}
</style>
