import "./WeatherCard.css";
import Sunny from "../../assets/Sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img src={Sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
