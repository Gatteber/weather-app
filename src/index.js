import './style.scss';

const mathConversions = (() => {
  const toCelsius = (kTemp) => kTemp - 273.15;

  return { toCelsius };
})();

const displayController = (() => {
  const renderTemp = (temp) => {
    const getTemp = document.querySelector('.current-temp');
    getTemp.innerHTML = `Current Temperature: ${temp} °C`;
  };

  const renderLoc = (loc) => {
    const getLoc = document.querySelector('.current-loc');
    getLoc.innerHTML = `Current Location: ${loc}`;
  };
  return { renderTemp, renderLoc };
})();

const dataModule = (() => {
  const baseLoc = async () => {
    const getBaseLoc = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Osaka&APPID=69f5f1430b2393d54d2d24a880e45502',
      { mode: 'cors' }
    );
    getBaseLoc.json().then((response) => {
      //   console.log(response);
      displayController.renderTemp(
        mathConversions.toCelsius(response.main.temp).toFixed(1)
      );
      displayController.renderLoc(response.name);
    });
  };
  baseLoc();

  const newLoc = async (val) => {
    const getNewLoc = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${val}&APPID=69f5f1430b2393d54d2d24a880e45502`,
      { mode: 'cors' }
    );
    getNewLoc.json().then((response) => {
      displayController.renderTemp(response.main.temp);
      displayController.renderLoc(response.name);
    });
  };
  return { baseLoc, newLoc };
})();

const newItem = (() => {
  const getForm = document.getElementById('submitButton');
  getForm.addEventListener('click', (e) => {
    e.preventDefault();
    const getData = document.getElementById('newSearch');
    dataModule.newLoc(getData.value);
    getData.value = null;
  });
})();

export default { dataModule };
