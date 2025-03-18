export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/DClear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/DCloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/DSnow.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/NClear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/NCloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/NSnow.svg", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: { url: new URL("../assets/Day.svg", import.meta.url).href },
  night: { url: new URL("../assets/Night.svg", import.meta.url).href },
};

export const coordinates = {
  latitude: 34.1156195,
  longitude: -118.2991927,
};

export const APIkey = "ee31a73c3241f2a80076ffa0cca05ede";
