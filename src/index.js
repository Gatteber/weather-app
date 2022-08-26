import './style.scss';

const mathConversions = (() => {
  const toCelsius = (kTemp) => kTemp - 273.15;

  return { toCelsius };
})();

const dataModule = (() => {
  const baseLoc = async () => {
    const getBaseLoc = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Osaka&APPID=69f5f1430b2393d54d2d24a880e45502',
      { mode: 'cors' }
    );
    getBaseLoc.json().then((response) => {
      console.log(
        mathConversions.toCelsius(response.main.temp) + ` Degrees Celsius`
      );
    });
  };
  baseLoc();
})();

export default { dataModule };
