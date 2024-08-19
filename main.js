const findInput = document.querySelector('.search__input');
const findBtnSearch = document.querySelector('.search__btn');
const findCityWeather = document.querySelector('.weather__container__block__select__city');
const findFavourites = document.querySelector('.weather__container__block__select__favourites');
const findCitys = document.querySelector('.citys');

const addClickInput = findBtnSearch.addEventListener('click' , showUrl)
const addFavouritesCity = findFavourites.addEventListener('click' , favouritesCity)

async function showUrl(e){
    e.preventDefault()
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = findInput.value;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    console.log(url);
    const getUrl = await fetch(url)
    .then(resalt => {
        return resalt.json()
    })
    .then(resalt => {
         findCityWeather.textContent = resalt.name
    })
    return getUrl
}

const arrFavourites = []

function favouritesCity(e) {
    e.preventDefault()
    if(arrFavourites.includes(findCityWeather.textContent)) return;
    const addInHtml = document.createElement('div');
    addInHtml.classList.add("weather__container__city");
    addInHtml.innerHTML = `
        <div class='weather__container__city__name'>${findCityWeather.textContent}</div>
        <div class='weather__container__city__closes'>x</div>
    `
    arrFavourites.push(findCityWeather.textContent)
    findCitys.insertAdjacentElement('beforeend', addInHtml);

    const findCityAddBtn = document.querySelectorAll('.weather__container__city__name')
    for (let i of findCityAddBtn) {
        i.addEventListener("click", chooseCityFavorites);
    }

    const findCityClosesBtn = document.querySelectorAll('.weather__container__city__closes')
    for (let i of findCityClosesBtn) {
        i.addEventListener("click", delFavouritesCityFun);
    }
}

function chooseCityFavorites(e){
    const delcity = e.target.closest('.weather__container__city');
    const findTextContent = delcity.querySelector('.weather__container__city__name').textContent;
    findCityWeather.textContent = findTextContent
}

function delFavouritesCityFun(e) {
    e.preventDefault()
    const delcity = e.target.closest('.weather__container__city');
    const findTextContent = delcity.querySelector('.weather__container__city__name').textContent;
    const index = arrFavourites.indexOf(findTextContent);
    if(index !== -1) {
        const delElementFromArr = arrFavourites.splice(index, 1)
    }
    delcity.remove()
}

